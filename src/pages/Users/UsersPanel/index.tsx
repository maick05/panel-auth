/* eslint-disable react-hooks/exhaustive-deps */
import style from "./UsersPanel.module.scss";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Button, Checkbox, Container, Dimmer, Header, Icon, Input, Segment, Select, Table } from "semantic-ui-react";
import { User } from "../../../model/user.model";
import { GetUserService } from "../../../services/users/get-user.service";
import { Loading } from "../../../components/Loading";
import { useSetLoading } from "../../../states/hooks/useSetLoading";
import { isLoading } from "../../../states/atoms/atom";
import { projectKeys } from "../../../consts/projects.const";
import { useNavigate } from "react-router-dom";



export function UsersPanel() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>();
    const [nameSearch, setName] = useState("");
    const [projectKey, setProjKey] = useState("");
    const [active, setActive] = useState(true);

    const useIsLoading = useRecoilValue(isLoading);
    const setLoading = useSetLoading();

    useEffect(() => {
        const getUsers = async (name = '', projKey = '', onlyActive = true) => {
            setLoading(true);
            const userService = new GetUserService();
            const usersRes = await userService.searchUsers(name, projKey, onlyActive);
            console.log(usersRes);
            if (usersRes.success) {
                setUsers(usersRes.message);
            }
            setLoading(false);
        }

        getUsers(nameSearch, projectKey, active).catch(console.error);
    }, [nameSearch, projectKey, active]);

    return (
        <RecoilRoot>
            <Dimmer.Dimmable as={Segment} dimmed={true}>
                <Header size='huge'>Users</Header>
                <Input
                    // loading={useIsLoading}
                    icon='search'
                    iconPosition='left'
                    placeholder='Name/Username...'
                    onChange={(e) => setName(e.target.value)}
                    className={style.inputSearch}
                />
                <Select
                    placeholder='Select the Project Key'
                    options={projectKeys}
                    onChange={(e, { name, value }) => setProjKey(value ? value?.toString() : "")}
                />

                <Checkbox
                    toggle
                    checked={active}
                    label="Only Active"
                    className={style.activeCB}
                    onChange={(e) => setActive(!active)}
                />

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Username/Email</Table.HeaderCell>
                            <Table.HeaderCell>Project Key</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {useIsLoading ? <Loading /> :
                            users?.map((item) => {
                                return (
                                    <Table.Row key={item._id}>
                                        <Table.Cell>{item._id}</Table.Cell>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>{item.username}</Table.Cell>
                                        <Table.Cell>{item.projectKey}</Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                color='orange'
                                                icon
                                                labelPosition='right'
                                                onClick={() => navigate(`/users/details/${item._id}`)}
                                            >
                                                Edit
                                                <Icon name='edit' />
                                            </Button>
                                        </Table.Cell>
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