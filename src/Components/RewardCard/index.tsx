import { Container } from "./styles";

interface IRewardCardProps {
    id: number
    date: string
    value: number
    response: boolean
}

const RewardCard = ({id, date, value, response}: IRewardCardProps) => {
    return (
        <Container>
            <h3 style={{marginRight: "10px"}}>{date}</h3>
            {response ? (<h3 data-testid={id}> R$ {value && (value / 100).toFixed(2).toString().replace('.', ",")}</h3>) : (null)}
        </Container>
    );
}

export default RewardCard