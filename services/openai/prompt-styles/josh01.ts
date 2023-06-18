import { openai, ApiRequest } from "../../openai";

export default async function openaiApiRequest({
  topic,
  subTopic,
  buzzwords,
}: ApiRequest) {
  console.log(
    `Fetch starting with: \nTopic: ${topic} \nSub Topic: ${subTopic} and  \nBuzzwords: ${buzzwords}`
  );

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Du bist ein Student, der einen Wikiartikel für ein Thema schreibt. Einfach zu verstehen, kurz und prägnant. Die Ober-Thematik betrifft ${topic}. Schreibe mir im GitHub Markdown eine Page, die ich in mein Github-Wiki einbinden kann.`,
      },
      {
        role: "user",
        content: `Mein erster Punkt über den du schreiben sollst ist "${subTopic}". Deine Headerstruktur sollte mit h2 anstelle von h1 beginnen! Hier ist ein Beispiel, wie deine Antwort strukturell aufgebaut sein könnte:

## Polymorphismus in OOP

Polymorphismus ist ein weiteres grundlegendes Konzept der objektorientierten Programmierung. Es ermöglicht Objekten, unterschiedliche Formen anzunehmen und dennoch die gleichen Operationen auszuführen.

### Anwendung

\`\`\`java
public abstract class Tier {
    public abstract void lautMachen();
}

public class Hund extends Tier {
    @Override
    public void lautMachen() {
        System.out.println("Wuff!");
    }
}

public class Katze extends Tier {
    @Override
    public void lautMachen() {
        System.out.println("Miau!");
    }
}

public class Main {
    public static void main(String[] args) {
        Tier hund = new Hund();
        Tier katze = new Katze();

        hund.lautMachen(); // Gibt "Wuff!" aus
        katze.lautMachen(); // Gibt "Miau!" aus
    }
}
\`\`\`

In diesem Beispiel sind \`Hund\` und \`Katze\` beides Unterklassen von \`Tier\` und sie überschreiben die Methode \`lautMachen()\`. Obwohl sowohl \`hund\` als auch \`katze\` als Objekte der Klasse \`Tier\` deklariert sind, führen sie unterschiedliche Implementierungen der Methode \`lautMachen()\` aus.

### Nutzen

Polymorphismus ermöglicht eine flexiblere und modularere Programmstruktur:

- **Code-Wiederverwendung**: Methoden können in einer allgemeinen Form in der Superklasse definiert und dann in den Unterklassen spezifisch implementiert werden.
- **Erweiterbarkeit**: Neue Klassen können einfach hinzugefügt werden, ohne den bestehenden Code zu ändern.

Polymorphismus trägt zur Erstellung von sauberem, wiederverwendbarem und gut organisierem Code bei, was die Wartbarkeit und Skalierbarkeit von Software verbessert.`,
      },
    ],
  });

  return (
    completion.data?.choices[0]?.message?.content || "No content available"
  );
}
