import { Container, Input } from './styles';

const InputComponent = ({label}: any) => {
    return (
        <Container>
            <label>{label}</label>
            <Input />
        </Container>
    );
}

export default InputComponent;