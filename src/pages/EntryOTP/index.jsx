import React, { useState } from "react";
import "./EntryOTP.css";
import { PrimaryEntryButton } from "../../components/StyledButton";
import { Input, Form, Space, Button } from "antd";
import { InputOTP } from "antd-input-otp";
import { CopyTwoTone } from '@ant-design/icons';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../config";
import { useNavigate } from "react-router-dom";

export const EntryOTP = () => {
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [number, setNumber] = useState('')
  const [result, setResult] = useState('')
  return (
    <>
    {!step1Done && !step2Done && 
      <Step1KeyInNumber 
        onStep1Finish={() => setStep1Done(true)}
        setResult={setResult}
        setNumber={(num) => setNumber(num)}
      />
    }
    {step1Done && !step2Done && 
      <Step2VerifyOTP 
        onStep2Finish={() => setStep2Done(true)} 
        number={number}
        result={result}
      />
    }
    {step1Done && step2Done && <Step3AllDone/>}
    </>
  );
};

const Step1KeyInNumber = (props) => {
  const [number, setNumber] = useState(0)
  
  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOtp = async () => {
    if (number === "" || number === undefined)
      return console.error("Please enter a valid phone number!");
    try {
      props.setNumber(number)
      const response = await setUpRecaptha(`+65${number}`);
      props.setResult(response);
      props.onStep1Finish()
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="otp-wrapper">
      <div>
        <h1>We’re an SMS away 💬</h1>
        <p>
          You will receive an One Time Password (OTP) to generate your unique
          link based on your phone number.
        </p>
        <Input 
          addonBefore="+65" 
          placeholder="Singapore phone number only" 
          maxLength={8}
          value={number === 0 ? '' : number}
          onChange={ (e) => {
            const telNo = e.target.value;
            const re = /^[0-9\b]+$/;
            if (telNo === '' || re.test(telNo)) {
              setNumber(e.target.value);
            }
          }}
        />
        <div id="recaptcha-container"></div>
      </div>
      <div>
        <PrimaryEntryButton onClick={getOtp}>
          Continue
        </PrimaryEntryButton>
      </div>
    </div>
  );
};

const Step2VerifyOTP = (props) => {
  const [form] = Form.useForm();

  const handleFinish = async () => {
    // The value will be array of string
    // Check the field if there is no value, or value is undefined/empty string
    // const { otp } = values;
    const otp  = form.getFieldValue("otp")
    // console.log(`OTP: ${otp}`);  
    if (!otp || otp.includes(undefined) || otp.includes(""))
      return form.setFields([
        {
          name: "otp",
          errors: ["OTP is invalid."]
        }
      ]);

    try {
      await props.result.confirm(otp.join(''));
      props.onStep2Finish()
    } catch (err) {
      console.error(err.message);
    }
    
  };

  // For removing the error message
  const handleValuesChange = (changedValues) => {
    const name = Object.keys(changedValues)?.[0];
    const errors = form.getFieldError(name);
    if (errors.length < 1) return;
    form.setFields([{ name, errors: [] }]);
  };
  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
      >
        <div className="otp-wrapper">
          <div>
            <h1>Verify OTP 👀</h1>
            <p>Code is sent to {props.number}</p>

            <Form.Item name="otp" className="center-error-message">
              <InputOTP inputType="numeric" length={6} />
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              <PrimaryEntryButton
                onClick={() => handleFinish()}
              >Verify</PrimaryEntryButton>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};

const Step3AllDone = () => {
  const navigate = useNavigate()
  const link = "https://eventourage.apps.tas.tz-hackathon.net/ashfeiurncnlkaoiwn"

  navigator.clipboard.writeText(link)
  return (
    <div className="otp-wrapper">
      <div>
        <h1>All done 🎉</h1>
        <p>Copy and save this unique link. <br/>If you lose your link, we can retrieve it again via the OTP process.</p>
        <Space.Compact className="link-wrapper">
          <Input readOnly defaultValue={link} />
          <Button onClick={navigator.clipboard.writeText(link)}>
            <CopyTwoTone twoToneColor="#80E572"/>
          </Button>
        </Space.Compact>
      </div>
      <div>
        <PrimaryEntryButton
          onClick={() => {
            navigator.clipboard.writeText(link)
            navigate('/ashfeiurncnlkaoiwn')
          }}
        >
          Copy & Explore
        </PrimaryEntryButton>
      </div>
    </div>
  );
};
