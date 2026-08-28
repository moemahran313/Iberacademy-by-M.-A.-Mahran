import { VocabularyItem } from '../types';

export const VOCABULARY_A2: VocabularyItem[] = [
  // Travel, Airport, Hotel & Transit
  { id: 'a2-1', spanish: 'viaje', english: 'trip / journey', arabic: 'رحلة / سفر', gender: 'el', phonetic: 'ˈbja.xe', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 78, examples: [{ es: '¡Buen viaje a España!', en: 'Have a good trip to Spain!', ar: 'رحلة سعيدة إلى إسبانيا!' }] },
  { id: 'a2-2', spanish: 'aeropuerto', english: 'airport', arabic: 'مطار', gender: 'el', phonetic: 'aeɾoˈpweɾto', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 79 },
  { id: 'a2-3', spanish: 'vuelo', english: 'flight', arabic: 'رحلة طيران', gender: 'el', phonetic: 'ˈbwelo', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 80 },
  { id: 'a2-4', spanish: 'hotel', english: 'hotel', arabic: 'فندق', gender: 'el', phonetic: 'oˈtel', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 81 },
  { id: 'a2-5', spanish: 'habitación', english: 'room / bedroom', arabic: 'غرفة', gender: 'la', phonetic: 'aβitaˈsjon', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 82 },
  { id: 'a2-6', spanish: 'maleta', english: 'suitcase / luggage', arabic: 'حقيبة سفر', gender: 'la', phonetic: 'maˈleta', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 83 },
  { id: 'a2-7', spanish: 'pasaporte', english: 'passport', arabic: 'جواز سفر', gender: 'el', phonetic: 'pasaˈpoɾte', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 84 },
  { id: 'a2-8', spanish: 'billete', english: 'ticket (train/plane)', arabic: 'تذكرة سفر', gender: 'el', phonetic: 'biˈʎete', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 85 },
  { id: 'a2-9', spanish: 'estación', english: 'station / season', arabic: 'محطة / فصل من فصول السنة', gender: 'la', phonetic: 'estaˈsjon', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 86 },
  { id: 'a2-10', spanish: 'tren', english: 'train', arabic: 'قطار', gender: 'el', phonetic: 'tɾen', cefr: 'A2', category: 'travel', partOfSpeech: 'noun', frequencyRank: 87 },

  // Health, Body & Routine
  { id: 'a2-11', spanish: 'cuerpo', english: 'body', arabic: 'جسم / جسد', gender: 'el', phonetic: 'ˈkweɾpo', cefr: 'A2', category: 'health', partOfSpeech: 'noun', frequencyRank: 88 },
  { id: 'a2-12', spanish: 'cabeza', english: 'head', arabic: 'رأس', gender: 'la', phonetic: 'kaˈβesa', cefr: 'A2', category: 'health', partOfSpeech: 'noun', frequencyRank: 89, examples: [{ es: 'Me duele la cabeza.', en: 'My head hurts.', ar: 'رأسي يؤلمني.' }] },
  { id: 'a2-13', spanish: 'mano', english: 'hand', arabic: 'يد (مؤنث)', gender: 'la', phonetic: 'ˈmano', cefr: 'A2', category: 'health', partOfSpeech: 'noun', frequencyRank: 90 },
  { id: 'a2-14', spanish: 'ojo', english: 'eye', arabic: 'عين', gender: 'el', phonetic: 'ˈoxo', cefr: 'A2', category: 'health', partOfSpeech: 'noun', frequencyRank: 91 },
  { id: 'a2-15', spanish: 'médico', english: 'doctor', arabic: 'طبيب', gender: 'el', phonetic: 'ˈmeðiko', cefr: 'A2', category: 'health', partOfSpeech: 'noun', frequencyRank: 92 },
  { id: 'a2-16', spanish: 'hospital', english: 'hospital', arabic: 'مستشفى', gender: 'el', phonetic: 'ospiˈtal', cefr: 'A2', category: 'health', partOfSpeech: 'noun', frequencyRank: 93 },
  { id: 'a2-17', spanish: 'enfermo', english: 'sick / ill', arabic: 'مريض', phonetic: 'emˈfeɾmo', cefr: 'A2', category: 'health', partOfSpeech: 'adjective', frequencyRank: 94 },
  { id: 'a2-18', spanish: 'cansado', english: 'tired / exhausted', arabic: 'متعب / مرهق', phonetic: 'kanˈsaðo', cefr: 'A2', category: 'health', partOfSpeech: 'adjective', frequencyRank: 95 },

  // Shopping, Clothes & Weather
  { id: 'a2-19', spanish: 'tienda', english: 'shop / store', arabic: 'متجر / دكان', gender: 'la', phonetic: 'ˈtjenda', cefr: 'A2', category: 'shopping', partOfSpeech: 'noun', frequencyRank: 96 },
  { id: 'a2-20', spanish: 'ropa', english: 'clothes / clothing', arabic: 'ملابس / ثياب', gender: 'la', phonetic: 'ˈropa', cefr: 'A2', category: 'shopping', partOfSpeech: 'noun', frequencyRank: 97 },
  { id: 'a2-21', spanish: 'camisa', english: 'shirt', arabic: 'قميص', gender: 'la', phonetic: 'kaˈmisa', cefr: 'A2', category: 'shopping', partOfSpeech: 'noun', frequencyRank: 98 },
  { id: 'a2-22', spanish: 'pantalones', english: 'pants / trousers', arabic: 'بنطال / سراويل', gender: 'los', phonetic: 'pantaˈlones', cefr: 'A2', category: 'shopping', partOfSpeech: 'noun', frequencyRank: 99 },
  { id: 'a2-23', spanish: 'zapatos', english: 'shoes', arabic: 'أحذية', gender: 'los', phonetic: 'saˈpatos', cefr: 'A2', category: 'shopping', partOfSpeech: 'noun', frequencyRank: 100 },
  { id: 'a2-24', spanish: 'precio', english: 'price', arabic: 'سعر / ثمن', gender: 'el', phonetic: 'ˈpɾesjo', cefr: 'A2', category: 'shopping', partOfSpeech: 'noun', frequencyRank: 101 },
  { id: 'a2-25', spanish: 'caro', english: 'expensive', arabic: 'غالي الثمن', phonetic: 'ˈkaɾo', cefr: 'A2', category: 'shopping', partOfSpeech: 'adjective', frequencyRank: 102 },
  { id: 'a2-26', spanish: 'barato', english: 'cheap / inexpensive', arabic: 'رخيص الثمن', phonetic: 'baˈɾato', cefr: 'A2', category: 'shopping', partOfSpeech: 'adjective', frequencyRank: 103 },
  { id: 'a2-27', spanish: 'lluvia', english: 'rain', arabic: 'مطر / غيث', gender: 'la', phonetic: 'ˈʎuβja', cefr: 'A2', category: 'weather', partOfSpeech: 'noun', frequencyRank: 104 },
  { id: 'a2-28', spanish: 'sol', english: 'sun', arabic: 'شمس', gender: 'el', phonetic: 'sol', cefr: 'A2', category: 'weather', partOfSpeech: 'noun', frequencyRank: 105 },
  { id: 'a2-29', spanish: 'viento', english: 'wind', arabic: 'رياح / ريح', gender: 'el', phonetic: 'ˈbjento', cefr: 'A2', category: 'weather', partOfSpeech: 'noun', frequencyRank: 106 },
  { id: 'a2-30', spanish: 'frío', english: 'cold', arabic: 'برد / بارد', gender: 'el', phonetic: 'ˈfɾi.o', cefr: 'A2', category: 'weather', partOfSpeech: 'noun', frequencyRank: 107 },
  { id: 'a2-31', spanish: 'calor', english: 'heat / warm', arabic: 'حرارة / حار', gender: 'el', phonetic: 'kaˈloɾ', cefr: 'A2', category: 'weather', partOfSpeech: 'noun', frequencyRank: 108 }
];
