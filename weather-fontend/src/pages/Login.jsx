
import {useState} from "react";
import { Card, Form, Input, Button, Typography, Flex } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <div style={{
                minHeight: "100dvh",
                background: "linear-gradient(135deg, #f0f5ff 0%, #ffffff 60%)",
                display: "grid",
                placeItems: "center",
                padding: "24px"
            }}>
                <Card

                    style={{ width: "100%", maxWidth: 420, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
                >
                    <Flex vertical gap={8} align="center" style={{ marginBottom: 12 }}>
                        <Typography.Title level={3} style={{ margin: 0 }}>Weather Assignment</Typography.Title>
                        <Typography.Text type="secondary">Sign in to continue</Typography.Text>
                    </Flex>


                    <Form
                        layout="vertical"
                        size="large"
                        requiredMark={false}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please enter your email" }]}
                        >
                            <Input  autoComplete="email" prefix={<UserOutlined />} placeholder="example@mail.com" />
                        </Form.Item>


                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please enter your password" }]}
                        >
                            <Input.Password autoComplete="current-password" prefix={<LockOutlined />} placeholder="••••••••" />
                        </Form.Item>


                        <Form.Item style={{ marginTop: 12 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<LoginOutlined />}
                                block
                            >
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>


                    {/*<Typography.Paragraph style={{ marginTop: 8 }} type="secondary">*/}
                    {/*    Tip: Hook up handleFinish to your API and redirect on success.*/}
                    {/*</Typography.Paragraph>*/}
                </Card>
            </div>

        </>
    )
}

export default Login;