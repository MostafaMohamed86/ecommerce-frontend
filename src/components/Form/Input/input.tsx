import React from "react";
import { Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
    label: string;
    name: Path<TFieldValue>;
    type?: string;
    register: UseFormRegister<TFieldValue>;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    formText?: string;
    success?: string;
    disabled?: boolean;
}

const input = <TFieldValue extends FieldValues>({ label, type= "text", register, name, error, onBlur, formText, success, disabled}: InputProps<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if(onBlur){
      onBlur(e);
      register(name).onBlur(e);
    }else{
      register(name).onBlur(e);
    }
  }
  return (
    <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control type={type} {...register(name)} 
    onBlur={onBlurHandler}
    isInvalid={error ? true : false} /* تغيير لون الرسالة للأحمر*/
    isValid={success ? true : false}
    disabled={disabled}
    /> 
    <Form.Control.Feedback type="invalid">
      {error} {/* ظهور الرسالة ui*/}
      </Form.Control.Feedback>
      <Form.Control.Feedback type="valid">
        {success}
      </Form.Control.Feedback>
      {formText && <Form.Text muted>{formText}</Form.Text>}
  </Form.Group>
  )
}

export default input
