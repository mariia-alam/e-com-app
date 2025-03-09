import { useState } from "react";
import { Form } from "react-bootstrap";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import styles from "./styles.module.css";

type TPasswordInputProps<TFieldValue extends FieldValues> = {
    name: Path<TFieldValue>;
    label: string;
    register: UseFormRegister<TFieldValue>;
    error: string;
};

const PasswordInput = <TFieldValue extends FieldValues>({
    label,
    name,
    register,
    error,
}: TPasswordInputProps<TFieldValue>) => {
    const [showPassword, setShowPassword] = useState(false);

return (
    <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <div className={`${styles.passwordField} ${error ? styles.hasError : ""}`}>
                    <Form.Control
                    type={showPassword ? "text" : "password"}
                    {...register(name)}
                    isInvalid={error ? true : false}
                    />
                    <span className={styles.togglePassword} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlash /> : <Eye />}
                    </span>
            </div>
            <Form.Control.Feedback type="invalid" style={{ display: error ? "block" : "none" }}>
                {error}
            </Form.Control.Feedback>
    </Form.Group>
)};
export default PasswordInput;
