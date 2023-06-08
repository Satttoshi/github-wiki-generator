
export default function Form(){


    async function fetchGenerator(formInput: any){
        const response = await fetch('/api/generator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: formInput})
        });
        const data = await response.json();
        return data;
    }

    // @ts-ignore
    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log(data.input);
        fetchGenerator(data.input).then(data => console.log(data));
    }

    return (<>
        <h1>Form</h1>
        <form onSubmit={handleSubmit} aria-label="Input">
            <fieldset>
                <legend>Legend</legend>
                <label htmlFor="input">Input</label>
                <input id="input" name="input" type="text" />
            </fieldset>
            <button type="submit">Submit</button>
        </form>
        </>)
};