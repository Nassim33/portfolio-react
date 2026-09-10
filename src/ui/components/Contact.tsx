import { Element } from "react-scroll";
import { Flex } from "antd";
import { Title } from "./globalStyledComponents";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <Element name="Contact" id="contact">
      <section
        style={{
          minHeight: "100vh",
          paddingTop: "var(--nav-height)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 2rem",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Title>Contact</Title>

          <Flex vertical align="center" style={{ width: "100%" }}>
            <ContactForm />
          </Flex>
        </div>
      </section>
    </Element>
  );
}
