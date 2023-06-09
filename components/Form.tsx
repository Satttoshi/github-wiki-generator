import styled from 'styled-components';
import useStore from '../zustand/store';

export default function Form(){
    const setMessage = useStore(state => state.setMessage);

    async function fetchGenerator(thema: any, subThema: any){
        const response = await fetch('/api/generator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({thema: thema, subThema: subThema})
        });
        return await response.json();
    }

    // @ts-ignore
    async function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log(data);

        const message = await fetchGenerator(data.thema, data.subThema);

        console.log("message: " + message.result);
        setMessage(message.result);
    }

    return (<>
        <h2>Java Programmierung</h2>
        <form onSubmit={handleSubmit} aria-label="Form Input">
            <StyledFieldset>
                <legend>Legend</legend>
                <label htmlFor="maintopic">Haupt Thema:</label>
                <input id="input" name="thema" type="text" />
                <label htmlFor="subtopic">Thema:</label>
                <input id="input" name="subThema" type="text" />
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