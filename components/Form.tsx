
export default function Form(){


    async function fetchGenerator(){
        const response = await fetch('/api/generator');
        const data = await response.json();
        return data;
    }

    // @ts-ignore
    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
    }

    return (<>
        <h1>Form</h1>
        <form onSubmit={handleSubmit} aria-label="Input">
            <fieldset>
                <legend>Legend</legend>
                <label htmlFor="input">Input</label>
                <input id="input" type="text" />
            </fieldset>
            <button type="submit">Submit</button>
        </form>
        </>)
};