import { Container, Input } from './styles';

const InputComponent = ({id, error, register, label, name}: any) => {
    return (
        <Container>
            <label>{label}</label>
            <Input data-testid={id} error={error} {...register(name)} />
            <span>{error && error}</span>
        </Container>
    );
}

export default InputComponent;