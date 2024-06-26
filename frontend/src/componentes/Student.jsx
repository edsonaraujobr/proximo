
export function Student({registration, name, course, typeAssistance, photo}) {
    console.log(photo)
    return (
        <div className="flex gap-4">
            { photo && photo !== 'http://localhost:3030/uploads/null' ?
            (
            <div className="w-24">
                <img src={photo} alt="Foto do Estudante" />
            </div>
            ) : null }

            <div className="flex flex-col">
                <span><strong className="font-bold">Nome:</strong> {name}</span>
                <span><strong className="font-bold">Curso:</strong> {course}</span>
                <span><strong className="font-bold">Matricula: </strong>{registration}</span>
                <span><strong className="font-bold">Tipo de auxílio:</strong> {typeAssistance}</span>
            </div>
        </div>
    )
}