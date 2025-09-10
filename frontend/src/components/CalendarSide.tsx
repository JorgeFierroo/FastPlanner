type CalendarSideProps = {
    selectedDate: string | null; // Fecha seleccionada
    tasks: string[]; // Tareas para la fecha seleccionada
};


export default function CalendarSide({ selectedDate, tasks }: CalendarSideProps) {
    return (
        <div>
            <h2>Fecha</h2>
            <p>{selectedDate}</p>
            <h3>Tareas</h3>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
}