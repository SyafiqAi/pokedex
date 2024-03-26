import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextFormatterService {

  removeUnwantedCharacters(text: string) {
    const formattedText = text.replace(/\f/g, "\n")
      .replace(/\u00ad\n/g, "")
      .replace(/\u00ad/g, "")
      .replace(/ -\n/g, " - ")
      .replace(/-\n/g, " - ")
      .replace(/\n/g, " ");

    return formattedText;
  }
  constructor() { }
}
