import { Form } from "react-bootstrap"
import { Path, FieldValues, UseFormRegister } from "react-hook-form"


type TInputProps<TFieldValue extends FieldValues> = {
    name: Path<TFieldValue>;
    label: string;
    type?: string;
    register:UseFormRegister<TFieldValue>;
    error: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    formText?: string;
    success?: string;
}
const  Input =<TFieldValue extends FieldValues>({label , name, type="text",  register , error, onBlur, formText, success}: TInputProps<TFieldValue>) => {
    const { onBlur: registerOnBlur, ...rest } = register(name);

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if(onBlur) {
            onBlur(e);
            register(name).onBlur(e);
        }else{
            registerOnBlur(e);
        }
    }
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control onBlur={onBlurHandler} type={type} {...rest} isInvalid={error? true : false} isValid={success? true : false}/>
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
                {success}
            </Form.Control.Feedback>
            {formText && <Form.Text muted>{formText}</Form.Text>}
        </Form.Group>
    )
}
export default Input
