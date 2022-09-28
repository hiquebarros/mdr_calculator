import { Container, Input } from './styles';

const InputComponent = ({error, register, label, name}: any) => {
    return (
        <Container>
            <label>{label}</label>
            <Input {...register(name)} />
            <span>{error && error}</span>
        </Container>
    );
}

export default InputComponent;