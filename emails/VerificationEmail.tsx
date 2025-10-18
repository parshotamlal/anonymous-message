import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1K9.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Here’s your verification code: {otp}</Preview>

      <Section style={{ padding: "20px" }}>
        <Heading as="h2">Email Verification</Heading>

        <Row>
          <Text>
            Hello <strong>{username}</strong>,
          </Text>
        </Row>

        <Row>
          <Text>
            Thank you for registering! Please use the following verification code
            to complete your registration:
          </Text>
        </Row>

        <Row>
          <Text style={{ fontSize: "24px", fontWeight: "bold" }}>{otp}</Text>
        </Row>

        <Row>
          <Button
            href={`http://localhost:3000/verify/${username}`}
            style={{
              backgroundColor: "#61dafb",
              color: "#000",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Verify Here
          </Button>
        </Row>

        <Row>
          <Text>If you didn’t request this code, please ignore this email.</Text>
        </Row>
      </Section>
    </Html>
  );
}
