/* eslint-disable react-hooks/exhaustive-deps */
import style from "./EditUser.module.scss";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Button, Checkbox, Container, Dimmer, Form, Grid, Header, List, Segment, Select } from "semantic-ui-react";
import { GetUserService } from "../../../services/users/get-user.service";
import { Loading } from "../../../components/Loading";
import { useSetLoading } from "../../../states/hooks/useSetLoading";
import { isLoading, actualUser } from "../../../states/atoms/atom";
import { useParams } from "react-router-dom";
import { projectKeys } from "../../../consts/projects.const";
import { GetScopesService } from "../../../services/scopes/get-scopes.service";
import { GrantScopeService } from "../../../services/scopes/grant-scope.service";
import { useSetIsUserActive } from "../../../states/hooks/useSetIsUserActive";
import { useSetUser } from "../../../states/hooks/useSetUser";
import { Scope } from "../../../model/scope.model";
import { toast } from 'react-toastify';
import { Toast } from "../../../components/Toast";
import { UpdateUserService } from "../../../services/users/update-user.service";

export function EditUser() {
    const params = useParams();

    // User
    const user = useRecoilValue(actualUser);
    const setUser = useSetUser();

    // Scopes
    const [projectKey, setProjKey] = useState("");
    const [scopeOptions, setScopeOptions] = useState([]);
    const [scope, setScope] = useState<string>("");
    const [loadScope, setloadScope] = useState(false);
    const [loadGrantScope, setloadGrantScope] = useState(false);

    const useIsLoading = useRecoilValue(isLoading);
    const [labelActive, setLabelActive] = useState(user.active ? "Active" : "Inactive");
    const setLoading = useSetLoading();
    const setIsUserActive = useSetIsUserActive();


    const grantScope = async () => {
        setloadGrantScope(true);
        const grantScopeService = new GrantScopeService();
        const usersRes = await grantScopeService.grantScope(user.username, user.projectKey, [scope]);
        setloadGrantScope(false);

        if (!usersRes.success) {
            toast(usersRes.message)
            return;
        }

        toast("Scope granted!");

        setUser({ ...user, scopes: [...user.scopes, scope] })
    }

    const updateUser = async () => {
        setLoading(true);
        const updateService = new UpdateUserService();
        const usersRes = await updateService.updateUser(user._id, user.name);
        setLoading(false);

        if (!usersRes.success) {
            toast(usersRes.message)
            return;
        }

        toast("User updated!");

        setUser({ ...user, name: user.name })
    }

    useEffect(() => {

        const getUserById = async (id: string) => {
            setLoading(true);
            const userService = new GetUserService();
            const usersRes = await userService.getUserById(id);
            if (usersRes.success) {
                setUser({ ...usersRes.message, _id: id });
            }
            setLoading(false);
        }

        getUserById(params.id || "").catch(console.error);
    }, []);

    useEffect(() => {

        const getScopes = async (projectKey: string) => {
            setloadScope(true);
            const scopesService = new GetScopesService();
            const scopesRes = await scopesService.searchScopes('', projectKey);
            const scopes = scopesRes.message
                .filter((item: Scope) => user.scopes.indexOf(item.scopeID) === -1)
                .map((item: Scope) => {
                    return {
                        key: item.scopeID,
                        text: item.scopeID,
                        value: item.scopeID
                    }
                });

            if (scopesRes.success) {
                setScopeOptions(scopes);
            }
            setloadScope(false);
        }

        getScopes(projectKey).catch(console.error);
    }, [projectKey]);

    useEffect(() => {
        setLabelActive(user.active ? "Active" : "Inactive")
    }, [user]);

    return (
        <RecoilRoot>
            <Container>
                <Toast />
                <br />
                <Dimmer.Dimmable as={Segment} dimmed={true}>
                    <div className={style.container}>
                        <Header size='huge'>Edit User</Header>
                        {useIsLoading ? <Loading /> : <>
                            <Form>
                                <Form.Field className={style.formEdit}>
                                    <label>Name</label>
                                    <input
                                        value={user.name}
                                        placeholder='First Name'
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    />
                                </Form.Field >
                                <Form.Field className={style.formEdit}>
                                    <label>Email</label>
                                    <input readOnly disabled value={user.username} placeholder='Email/Username' />
                                </Form.Field>
                                <Form.Field className={style.formEdit}>
                                    <label>Project Key</label>
                                    <input readOnly disabled value={user.projectKey} placeholder='Email/Username' />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        toggle
                                        checked={user.active}
                                        label={labelActive}
                                        onChange={(e) => setIsUserActive(!user.active)}
                                    />
                                </Form.Field>
                                <label className={style.scopeLabel}>Scopes</label>
                                <Grid columns={3}>
                                    <Grid.Row className={style.rowPK}>
                                        <Grid.Column width={4}>
                                            <Select
                                                placeholder='Project Key'
                                                options={projectKeys.slice(1, projectKeys.length)}
                                                value={projectKey}
                                                onChange={(e, { name, value }) => setProjKey(value ? value?.toString() : "")}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            <Select
                                                className={style.scopeField}
                                                placeholder='Scope'
                                                loading={loadScope}
                                                options={scopeOptions}
                                                value={scope}
                                                onChange={(e, { name, value }) => {
                                                    setScope(value?.toString() || "");
                                                }}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Button
                                                color='blue'
                                                type='button'
                                                loading={loadGrantScope}
                                                disabled={!user.active}
                                                onClick={() => grantScope()}
                                            >Grant Scope</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <List celled>
                                    {user.scopes.map((item) => {
                                        return (<List.Item key={item}>{item}</List.Item>)
                                    })}
                                </List>

                                <Button
                                    color='blue'
                                    type='button'
                                    disabled={!user.active}
                                    onClick={() => updateUser()}
                                >Save</Button>
                            </Form>
                        </>}
                    </div>
                </Dimmer.Dimmable>
            </Container>
        </RecoilRoot >
    );
}