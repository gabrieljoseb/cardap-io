import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";


const months = [
    {
        option: "January"
    },
    {
        option: 'February'
    },
    {
        option: 'March'
    },
    {
        option: 'April'
    },
    {
        option: 'May'
    },
    {
        option: 'June'
    },
    {
        option: 'July'
    },
    {
        option: 'August'
    },
    {
        option: 'September'
    },
    {
        option: 'October'
    },
    {
        option: 'November'
    },
    {
        option: 'December'
    },
]

const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];


export default function RegistrationForm() {
    const [formValue, setFormValue] = useState({ name: '', lastName: '', email: '', password: '', repeatPassword: '', month: '', day: '', year: '' });
    const [formError, setFormError] = useState({})
    const [submit, setSubmit] = useState(false);
    const [years, setYears] = useState([]);
    useEffect(() => {
        function generateArrayOfYears() {
            let max = new Date().getFullYear();
            let min = max - 40;
            for (let i = max; i >= min; i--) {
                setYears(prevYears => [...prevYears, i])
            }
        }
        generateArrayOfYears();

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(validateForm(formValue))
        setSubmit(true);

    }

    const handleValidation = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }
    const validateForm = (value) => {

        let errors = {}
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!value.name) {
            errors.name = "Nome completo Inválido!"
        }
        if (!value.cpf) {
            errors.lastName = "CPF Inválido!"
        }
        if (!value.email) {
            errors.email = "Email Inválido!"
        }
        else if (!emailRegex.test(value.email)) {
            errors.email = "Email Inválido!"
        }
        if (!value.password) {
            errors.password = "Senha Inválida"
        }
        if (!value.repeatPassword) {
            errors.repeatPassword = "Favor, repita a senha"
        }
        if (value.password !== value.repeatPassword) {
            errors.password = "Senhas não coincidem"
        }
        if (!value.day) {
            errors.day = "Data de Nascimento é obrigatória!"
        }
        if (!value.month) {
            errors.month = "Data de Nascimento é obrigatória!"
        }
        if (!value.year) {
            errors.year = "Data de Nascimento é obrigatória!"
        }

        return errors;
    }
    return (
        <React.Fragment>
            {submit && Object.keys(formError).length === 0 ? <p className="form-submit-msg">Sucesso! Favor, verifique seu e-mail para efetivar o cadastro.</p> :
                <form className="registration-form" onSubmit={handleSubmit}>
                    <section className="name-section">
                        <input type="text" placeholder="Nome completo" name="name" value={formValue.name}
                            onChange={handleValidation} />
                        <span className="registration-input-err">{formError.name}</span>
                    </section>
                    <section className="cpf-section">
                        <InputMask type="text" mask="999.999.999-99" placeholder="CPF" name="cpf" value={formValue.cpf}
                            onChange={handleValidation} />
                        <span className="registration-input-err">{formError.cpf}</span>
                    </section>
                    <section className="phone-section">
                        <InputMask type="text" mask="(99)99999-9999" placeholder="Celular" name="phone" value={formValue.phone}
                            onChange={handleValidation} />
                        <span className="registration-input-err">{formError.phone}</span>
                    </section>

                    <section className="email-section">
                        <input type="text" placeholder="Email" name="email" value={formValue.email}
                            onChange={handleValidation} />
                        <span className="registration-input-err">{formError.email}</span>
                    </section>
                    <section className="password-section">
                        <input type="password" placeholder="Nova senha" name="password" value={formValue.password}
                            onChange={handleValidation} />
                        <span className="registration-input-err">{formError.password}</span>
                        <input type="password" placeholder="Repita a senha" name="repeatPassword" value={formValue.repeatPassword}
                            onChange={handleValidation} />
                        <span className="registration-input-err">{formError.repeatPassword}</span>
                    </section>
                    <section className="birthday">
                        <section>
                            <label htmlFor="birthday">Data de Nascimento</label>
                        </section>
                        <section className="birthday-section">
                            <select name="day" value={formValue.day} onChange={handleValidation}>
                                {days.map((day) => (<option value={day} key={day}>{day}</option>))}
                            </select>
                            <span className="registration-input-err">{formError.day}</span>

                            <select name="month" value={formValue.month} onChange={handleValidation}
                            >
                                {months.map((month) => (<option value={month.option} key={month.option}>{month.option}</option>))}
                            </select>
                            <span className="registration-input-err">{formError.month}</span>
                            <select name="year" className="year" value={formValue.year} onChange={handleValidation}>
                                {years.map((year, index) => <option value={year} key={index}>{year}</option>)}
                            </select>
                            <span className="registration-input-err">{formError.year}</span>
                        </section>
                    </section>
                    <section className="register-section">
                        <p className="terms-warning">
                            Ao clicar em registrar-se, você aceita nossos termos, política de dados
                            e cookies. Você pode receber uma notificação por e-mail de nós e pode
                            descadastrar-se a qualquer momento.
                        </p>

                    </section>
                    <button className="register-btn" type="submit">Registrar-se</button>
                </form>
            }
        </React.Fragment>

    )
}