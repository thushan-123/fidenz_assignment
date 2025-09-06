import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Typography, Flex, message } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import {login_request} from "../ApiEndpoint/ApiCall.js";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        const { email, password } = values;
        setLoading(true);

        try {
            if (email && password) {
                const response = await login_request(email, password);
                console.log("response", response);
                if(response){
                    message.success("Login successful!");
                    sessionStorage.setItem("token", response.token);
                    navigate("/home");
                }else{
                    console.log("Login failed!");
                }

            } else {
                message.error("validation failed");
            }
        } catch (error) {
            console.error(error);
            message.error("Login failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                    onFinish={handleLogin}
                >
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<LoginOutlined />}
                            loading={loading}
                            block
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
