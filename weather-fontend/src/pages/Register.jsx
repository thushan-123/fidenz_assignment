import {Button, Card, Flex, Form, Input, message, Typography} from "antd";
import {LockOutlined, LoginOutlined, UserOutlined} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {register_request} from "../ApiEndpoint/ApiCall.js";


const Register = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        const { first_name, last_name, email, password } = values;

        try {
            if (email && password) {
                setLoading(true);
                const response = await register_request(first_name, last_name, email, password);
                console.log("response", response);
                if(response){
                    message.success("register successful!");
                    navigate("/?register=true");
                }else{
                    message.error("Registration failed");
                }
            } else {
                message.error("Validation failed");
            }
        } catch (error) {
            console.error(error);
            message.error("Register failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                style={{
                    minHeight: "100dvh",
                    background: "linear-gradient(135deg, #f0f5ff 0%, #ffffff 60%)",
                    display: "grid",
                    placeItems: "center",
                    padding: "24px",
                }}
            >
                <Card
                    style={{
                        width: "100%",
                        maxWidth: 420,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                >
                    <Flex vertical gap={8} align="center" style={{ marginBottom: 12 }}>
                        <Typography.Title level={3} style={{ margin: 0 }}>
                            Weather Assignment
                        </Typography.Title>
                        <Typography.Text type="secondary">Sign in to continue</Typography.Text>
                    </Flex>

                    <Form
                        layout="vertical"
                        size="large"
                        requiredMark={false}
                        onFinish={handleRegister}
                    >
                        <Form.Item
                            label="First name"
                            name="first_name"
                            rules={[{ required: true, message: "Please enter your first name" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="John" />
                        </Form.Item>

                        <Form.Item
                            label="Last name"
                            name="last_name"
                            rules={[{ required: true, message: "Please enter your last name" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Richard" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please enter your email" }]}
                        >
                            <Input
                                autoComplete="email"
                                prefix={<UserOutlined />}
                                placeholder="example@mail.com"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please enter your password" }]}
                        >
                            <Input.Password
                                autoComplete="current-password"
                                prefix={<LockOutlined />}
                                placeholder="••••••••"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginTop: 12 }}>
                            <Typography.Text type="secondary">Create an account to continue</Typography.Text>

                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<LoginOutlined />}
                            loading={loading}
                            block
                        >
                            Sign up
                        </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default Register;