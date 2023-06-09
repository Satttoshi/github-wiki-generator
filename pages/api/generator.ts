import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function openaiApiRequest (thema: string, subThema: string) {

    console.log("Fetch starting with: \nThema: " + thema + "\nSub Thema: " + subThema);

    const completion = await openai.createChatCompletion({

        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content:
                    "Du bist ein Student, der einen Wikiartikel für ein Thema schreibt. " +
                    "Einfach zu verstehen, kurz und prägnant." +
                    `Die Ober-Thematik betrifft ${thema} `  +
                    "Schreibe mir im GitHub Markdown eine Page, die ich in mein Github-Wiki einbinden kann. "
            },
            {
                role: 'user',
                content: `Mein erster Punkt über den du schreiben sollst ist "${subThema}"` +
                    "Deine Headerstruktur sollte mit h2 anstelle von h1 beginnen!" +
                    "Hier ist ein Beispiel, wie deine Antwort strukturell aufgebaut sein könnte: \n" +
                    "# Polymorphismus in OOP\n" +
                    "\n" +
                    "Polymorphismus ist ein weiteres grundlegendes Konzept der objektorientierten Programmierung. Es ermöglicht Objekten, unterschiedliche Formen anzunehmen und dennoch die gleichen Operationen auszuführen.\n" +
                    "\n" +
                    "## Anwendung\n" +
                    "\n" +
                    "```java\n" +
                    "public abstract class Tier {\n" +
                    "    public abstract void lautMachen();\n" +
                    "}\n" +
                    "\n" +
                    "public class Hund extends Tier {\n" +
                    "    @Override\n" +
                    "    public void lautMachen() {\n" +
                    "        System.out.println(\"Wuff!\");\n" +
                    "    }\n" +
                    "}\n" +
                    "\n" +
                    "public class Katze extends Tier {\n" +
                    "    @Override\n" +
                    "    public void lautMachen() {\n" +
                    "        System.out.println(\"Miau!\");\n" +
                    "    }\n" +
                    "}\n" +
                    "\n" +
                    "public class Main {\n" +
                    "    public static void main(String[] args) {\n" +
                    "        Tier hund = new Hund();\n" +
                    "        Tier katze = new Katze();\n" +
                    "\n" +
                    "        hund.lautMachen(); // Gibt \"Wuff!\" aus\n" +
                    "        katze.lautMachen(); // Gibt \"Miau!\" aus\n" +
                    "    }\n" +
                    "}\n" +
                    "```\n" +
                    "In diesem Beispiel sind `Hund` und `Katze` beides Unterklassen von `Tier` und sie überschreiben die Methode `lautMachen()`. Obwohl sowohl `hund` als auch `katze` als Objekte der Klasse `Tier` deklariert sind, führen sie unterschiedliche Implementierungen der Methode `lautMachen()` aus.\n" +
                    "\n" +
                    "## Nutzen\n" +
                    "\n" +
                    "Polymorphismus ermöglicht eine flexiblere und modularere Programmstruktur:\n" +
                    "\n" +
                    "- **Code-Wiederverwendung**: Methoden können in einer allgemeinen Form in der Superklasse definiert und dann in den Unterklassen spezifisch implementiert werden.\n" +
                    "- **Erweiterbarkeit**: Neue Klassen können einfach hinzugefügt werden, ohne den bestehenden Code zu ändern.\n" +
                    "\n" +
                    "Polymorphismus trägt zur Erstellung von sauberem, wiederverwendbarem und gut organisierem Code bei, was die Wartbarkeit und Skalierbarkeit von Software verbessert."
            }
        ]
    });
    // @ts-ignore
    return completion.data.choices[0].message.content;
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (!configuration.apiKey) {
        response.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    try {
        const completion = await openaiApiRequest(request.body.thema, request.body.subThema);
        console.log(completion);
        response.status(200).json({ result: completion });

    } catch(error: any) {

        if (error.response) {
            console.error(error.response.status, error.response.data);
            response.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            response.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

