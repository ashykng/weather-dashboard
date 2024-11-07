export default function Alert({error, solution=null}) {
    return (
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error: {error}</h4>
            {solution && (<><hr /> <p class="mb-0">{solution}</p></>)}
        </div>
    );
};
