/* eslint-disable react-hooks/exhaustive-deps */
import style from "./ProjectsPanel.module.scss";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Dimmer, Header, Input, Segment, Table } from "semantic-ui-react";
import { Loading } from "../../../components/Loading";
import { useSetLoading } from "../../../states/hooks/useSetLoading";
import { isLoading } from "../../../states/atoms/atom";
import { Project } from "../../../model/project.model";
import { GetProjectService } from "../../../services/projects/get-project.service";

export function ProjectsPanel() {
    const [projects, setProjects] = useState<Project[]>();
    const [idSearch, setId] = useState("");

    const useIsLoading = useRecoilValue(isLoading);
    const setLoading = useSetLoading();

    useEffect(() => {
        const getProjects = async (id = '') => {
            setLoading(true);
            const getProjService = new GetProjectService();
            const scopesRes = await getProjService.searchProjects(id);
            if (scopesRes.success) {
                setProjects(scopesRes.message);
            }
            setLoading(false);
        }

        getProjects(idSearch).catch(console.error);
    }, [idSearch]);

    return (
        <RecoilRoot>
            <Dimmer.Dimmable as={Segment} dimmed={true}>
                <Header size='huge'>Projects</Header>
                <Input
                    icon='search'
                    iconPosition='left'
                    placeholder='Search the project key...'
                    onChange={(e) => setId(e.target.value)}
                    className={style.inputSearch}
                />

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Project Key</Table.HeaderCell>
                            <Table.HeaderCell>Scope Key</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {useIsLoading ? <Loading /> :
                            projects?.map((item) => {
                                return (
                                    <Table.Row key={item.name}>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>{item.projectKey}</Table.Cell>
                                        <Table.Cell>{item.scopeKey}</Table.Cell>
                                        <Table.Cell>{item.description}</Table.Cell>
                                    </Table.Row>
                                );
                            })}
                    </Table.Body>

                    {/* <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer> */}
                </Table>
            </Dimmer.Dimmable>
        </RecoilRoot >
    );
}