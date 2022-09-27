/* eslint-disable react-hooks/exhaustive-deps */
import style from "./ScopesPanel.module.scss";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Dimmer, Header, Input, Segment, Select, Table } from "semantic-ui-react";
import { Loading } from "../../../components/Loading";
import { useSetLoading } from "../../../states/hooks/useSetLoading";
import { isLoading } from "../../../states/atoms/atom";
import { projectKeys, resourceKeys } from "../../../consts/projects.const";
import { Scope } from "../../../model/scope.model";
import { GetScopesService } from "../../../services/scopes/get-scopes.service";



export function ScopesPanel() {
    const [scopes, setScopes] = useState<Scope[]>();
    const [idSearch, setId] = useState("");
    const [projectKey, setProjKey] = useState("");
    const [resourceKey, setResourceKey] = useState("");

    const useIsLoading = useRecoilValue(isLoading);
    const setLoading = useSetLoading();

    useEffect(() => {
        const getScopes = async (id = '', projKey = '', resourceKey = '') => {
            setLoading(true);
            const getScopesService = new GetScopesService();
            const scopesRes = await getScopesService.searchScopes(id, projKey, resourceKey);
            if (scopesRes.success) {
                setScopes(scopesRes.message);
            }
            setLoading(false);
        }

        getScopes(idSearch, projectKey, resourceKey).catch(console.error);
    }, [idSearch, projectKey, resourceKey]);

    return (
        <RecoilRoot>
            <Dimmer.Dimmable as={Segment} dimmed={true}>
                <Header size='huge'>Scopes</Header>
                <Input
                    icon='search'
                    iconPosition='left'
                    placeholder='Scope ID...'
                    onChange={(e) => setId(e.target.value)}
                    className={style.inputSearch}
                />
                <Select
                    placeholder='Select the Project Key'
                    options={projectKeys.filter((item) => item.key !== 'GLOBAL')}
                    onChange={(e, { name, value }) => setProjKey(value ? value?.toString() : "")}
                />

                <Select
                    placeholder='Select the Resource Key'
                    className={style.inputKey}
                    options={resourceKeys}
                    onChange={(e, { name, value }) => setResourceKey(value ? value?.toString() : "")}
                />

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Project Key</Table.HeaderCell>
                            <Table.HeaderCell>Resource Key</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {useIsLoading ? <Loading /> :
                            scopes?.map((item) => {
                                return (
                                    <Table.Row key={item.scopeID}>
                                        <Table.Cell>{item.scopeID}</Table.Cell>
                                        <Table.Cell>{item.projectKey}</Table.Cell>
                                        <Table.Cell>{item.resourceKey}</Table.Cell>
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