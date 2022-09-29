import { Container } from "./styles";

interface IRewardCardProps {
    date: string
    value: number
    response: boolean
}

const RewardCard = ({date, value, response}: IRewardCardProps) => {
    return (
        <Container>
            <h3>{date}:</h3>
            {response ? (<h3> R$ {value && (value / 100).toFixed(2).toString().replace('.', ",")}</h3>) : (null)}
        </Container>
    );
}

export default RewardCard