import { Container } from "./styles";

interface IRewardCardProps {
    id: number
    date: string
    value: number
    response: boolean
}

const RewardCard = ({id, date, value, response}: IRewardCardProps) => {
    return (
        <Container data-testid={id}>
            <h3 style={{marginRight: "10px"}}>{date}</h3>
            <h3></h3>{response ? (<h3> R$ {value && (value / 100).toFixed(2).toString().replace('.', ",")}</h3>) : (null)}
        </Container>
    );
}

export default RewardCard