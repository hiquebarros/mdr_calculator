import { Container, Input } from './styles';

const InputComponent = ({register, label, name}: any) => {
    return (
        <Container>
            <label>{label}</label>
            <Input {...register(name)} />
        </Container>
    );
}

export default InputComponent;