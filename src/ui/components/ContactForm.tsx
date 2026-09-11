import React, { ViewTransition, startTransition } from "react";
import { Alert, Button, Form, Input, Flex } from "antd";
import { formspreeUrl } from "../../data";
import type { ContactFormData } from "../../schemas";

type SendStatus = "idle" | "sending" | "success" | "error";

const { TextArea } = Input;

export default function ContactForm() {
  const [form] = Form.useForm();
  const [sendStatus, setSendStatus] = React.useState<SendStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function postData(data: ContactFormData) {
    return fetch(formspreeUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  async function handleSubmit(values: ContactFormData) {
    if (sendStatus === "sending") return;

    setSendStatus("idle");

    setSendStatus("sending");
    try {
      const response = await postData(values);
      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText}, check formspreeUrl in data`
        );
      }
      form.resetFields();
      startTransition(() => setSendStatus("success"));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
      form.resetFields();
      startTransition(() => setSendStatus("error"));
    }
  }

  return (
    <Flex vertical align="center" style={{ width: "100%" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ width: "100%", maxWidth: 750 }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name must be at least one character." }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>

        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { required: true, message: "Please enter a valid email." },
            {
              pattern:
                /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/,
              message: "Please enter a valid email.",
            },
          ]}
        >
          <Input placeholder="someone@something.com" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please provide a valid message." }]}
        >
          <TextArea rows={4} placeholder="Your message..." />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          {formspreeUrl && (
            <Button
              size="large"
              htmlType="submit"
              loading={sendStatus === "sending"}
              style={{ marginTop: "0.5rem" }}
            >
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>

      <ViewTransition default="vt-contact">
        {sendStatus === "success" && (
          <Alert
            message="Success! I will contact you soon."
            type="success"
            showIcon
            closable
            onClose={() => startTransition(() => setSendStatus("idle"))}
            style={{ marginTop: "1rem", maxWidth: 750, width: "100%" }}
          />
        )}
        {sendStatus === "error" && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            closable
            onClose={() => startTransition(() => setSendStatus("idle"))}
            style={{ marginTop: "1rem", maxWidth: 750, width: "100%" }}
          />
        )}
        {!formspreeUrl && (
          <Alert
            message="You must provide a valid formspree url in data."
            type="error"
            showIcon
            style={{ marginTop: "1rem", maxWidth: 750, width: "100%" }}
          />
        )}
      </ViewTransition>
    </Flex>
  );
}
