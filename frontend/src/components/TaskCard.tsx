type Props = {
    text: string;
};

function TaskCard({ text }: Props) {
    return (
        <div className= "bg-white p-2 rounded shadow border">
            {text}
        </div>
    );
}

export default TaskCard;