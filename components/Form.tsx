import styled from 'styled-components';


export default function Form(){


    async function fetchGenerator(formInput: any){
        const response = await fetch('/api/generator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({input: formInput})
        });
        return await response.json();
    }

    // @ts-ignore
    async function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const message = await fetchGenerator(data.input);

        console.log("message: " + JSON.stringify(message));
    }

    return (<>
        <h1>Form</h1>
        <form onSubmit={handleSubmit} aria-label="Form Input">
            <StyledFieldset>
                <legend>Legend</legend>
                <label htmlFor="input">Input</label>
                <input id="input" name="input" type="text" />
            </StyledFieldset>
            <button type="submit">Submit</button>
        </form>
        </>)
};

const StyledFieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 0.2rem
`;