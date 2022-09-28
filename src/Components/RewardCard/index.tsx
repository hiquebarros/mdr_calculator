import { Container } from "./styles";

interface IRewardCardProps {
    date: string
    value: number
}

const RewardCard = ({date, value}: IRewardCardProps) => {
    return (
        <Container>
            <h3>{date}:</h3>
            <h3>R$ {value && value.toString()},00</h3>
        </Container>
    );
}

export default RewardCard