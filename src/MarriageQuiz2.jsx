import React, { useState } from 'react';
import { Heart, TrendingDown, Brain, Zap, ArrowLeft } from 'lucide-react';

const MarriageQuiz2 = () => {
  const [currentPath, setCurrentPath] = useState(['start']);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = {
    start: {
      question: 'Jaki jest Twój status?',
      options: [
        { value: 'dating', label: 'Poznawanie/randkowanie', next: 'dating_length' },
        { value: 'engaged', label: 'Zaangażowany/Zaręczony', next: 'engaged_prenup' },
        { value: 'married_happy', label: 'Żonaty i szczęśliwy', next: 'married_prenup' },
        { value: 'married_unhappy', label: 'Żonaty i nieszczęśliwy', next: 'married_problems' },
        { value: 'trouble', label: 'Relacja w kryzysie', next: 'trouble_stage' },
        { value: 'divorce', label: 'W trakcie rozwodu', next: 'divorce_stage' }
      ]
    },

    dating_length: {
      question: 'Jak długo się znacie?',
      options: [
        { value: 'under_1y', label: 'Poniżej roku', next: 'dating_flags' },
        { value: '1_2y', label: '1-2 lata', next: 'dating_flags' },
        { value: 'over_2y', label: 'Ponad 2 lata', next: 'calculate' }
      ]
    },

    dating_flags: {
      question: 'Widzisz czerwone flagi?',
      options: [
        { value: 'no_flags', label: 'Nie, wszystko OK', next: 'calculate' },
        { value: 'controlling', label: 'Kontrolująca, zazdrosna', next: 'calculate' },
        { value: 'financial', label: 'Ukrywa finanse lub żąda dostępu', next: 'calculate' },
        { value: 'pressure', label: 'Presja do ślubu/dzieci', next: 'calculate' },
        { value: 'many_flags', label: 'Wiele flag, ale ignoruję', next: 'calculate' }
      ]
    },

    engaged_prenup: {
      question: 'Rozmowa o intercyzie?',
      options: [
        { value: 'agreed', label: 'Zgodziliśmy się', next: 'calculate' },
        { value: 'not_yet', label: 'Jeszcze nie', next: 'calculate' },
        { value: 'refused', label: 'Odradziła', next: 'calculate' },
        { value: 'afraid_ask', label: 'Boję się pytać', next: 'calculate' }
      ]
    },

    married_prenup: {
      question: 'Masz intercyzę?',
      options: [
        { value: 'yes', label: 'Tak', next: 'married_fidelity' },
        { value: 'no', label: 'Nie', next: 'married_fidelity' }
      ]
    },

    married_fidelity: {
      question: 'Czy wierzysz jej?',
      options: [
        { value: 'trust', label: 'Całkowicie', next: 'calculate' },
        { value: 'doubts', label: 'Mam wątpliwości', next: 'calculate' },
        { value: 'suspected', label: 'Podejrzewam zdradę', next: 'calculate' },
        { value: 'confirmed', label: 'Wiem że zdradziła', next: 'calculate' }
      ]
    },

    married_problems: {
      question: 'Co poszło źle?',
      options: [
        { value: 'incompatibility', label: 'Jesteśmy niekompatybilni', next: 'married_exit' },
        { value: 'changed', label: 'Zmieniła się po ślubie', next: 'married_exit' },
        { value: 'controlling', label: 'Zbyt kontrolująca', next: 'married_exit' },
        { value: 'affair', label: 'Podejrzewam/potwierdzam zdradę', next: 'married_exit' }
      ]
    },

    married_exit: {
      question: 'Chcesz wyjść?',
      options: [
        { value: 'yes', label: 'Tak, chcę rozwód', next: 'trouble_stage' },
        { value: 'maybe', label: 'Może', next: 'calculate' },
        { value: 'trying', label: 'Próbuję pracować nad tym', next: 'calculate' }
      ]
    },

    trouble_stage: {
      question: 'Na jakim jesteś etapie?',
      options: [
        { value: 'just_starting', label: 'Dopiero myślę o rozstaniu', next: 'trouble_prepare' },
        { value: 'in_crisis', label: 'Kryzys, atmosfera napięta', next: 'trouble_tactics' },
        { value: 'filed', label: 'Już złożyłem pozew', next: 'trouble_tactics' }
      ]
    },

    trouble_prepare: {
      question: 'Co robić?',
      options: [
        { value: 'consult_lawyer', label: 'Konsultacja z adwokatem', next: 'calculate' },
        { value: 'doc_assets', label: 'Dokumentuję majątek', next: 'calculate' },
        { value: 'separate_account', label: 'Otwieram oddzielne konto', next: 'calculate' },
        { value: 'nothing_yet', label: 'Nic jeszcze', next: 'calculate' }
      ]
    },

    trouble_tactics: {
      question: 'Jakie taktyki ona stosuje?',
      options: [
        { value: 'fair', label: 'Fair play', next: 'calculate' },
        { value: 'manipulation', label: 'Emotywna manipulacja', next: 'calculate' },
        { value: 'kids', label: 'Grozi dostępem do dzieci', next: 'calculate' },
        { value: 'all', label: 'Wszystkie środki', next: 'calculate' }
      ]
    },

    divorce_stage: {
      question: 'Jak zaawansowany jest proces?',
      options: [
        { value: 'early', label: 'Wczesny (0-3 miesiące)', next: 'divorce_lawyer' },
        { value: 'mid', label: 'Środkowy (3-9 miesięcy)', next: 'divorce_lawyer' },
        { value: 'late', label: 'Zaawansowany (9+ miesięcy)', next: 'divorce_lawyer' }
      ]
    },

    divorce_lawyer: {
      question: 'Masz adwokata?',
      options: [
        { value: 'no', label: 'Nie', next: 'calculate' },
        { value: 'mediocre', label: 'Średni', next: 'calculate' },
        { value: 'good', label: 'Dobry, specjalizuje się', next: 'calculate' },
        { value: 'excellent', label: 'Doskonały, znany z wygrywania', next: 'calculate' }
      ]
    }
  };

  const calculateResult = (finalAnswers) => {
    const scenarios = [];
    const recommendations = [];
    const explanations = [];
    let riskLevel = 'low';
    let mainTitle = '';
    let mainDescription = '';

    const status = finalAnswers.start;

    if (status === 'dating') {
      const flags = finalAnswers.dating_flags;

      if (flags === 'many_flags') {
        riskLevel = 'critical';
        mainTitle = '🚨 Ignorujesz czerwone flagi';
        mainDescription = 'Znasz problemy ale ignorujesz. To nigdy się dobrze nie kończy.';
        scenarios.push({ scenario: 'Małżeństwo z wiadomymi wadami', chance: 85, explanation: 'Będziesz mieć nadzieję przez lata zanim zaakceptujesz rzeczywistość.' });
        recommendations.push('Pytaj siebie: Czy mogę żyć z tym wiecznie?');
        recommendations.push('Jeśli odpowiedź to "nie" - teraz jest moment na wyjście');

      } else if (flags === 'controlling' || flags === 'pressure') {
        riskLevel = 'high';
        mainTitle = '⚠️ Czerwone flagi widoczne';
        mainDescription = 'Kontrolowanie i presja to znaki manipulacji.';
        scenarios.push({ scenario: 'Relacja będzie coraz bardziej kontrolowana', chance: 75, explanation: 'Takie zachowania zwykle się nasilają po ślubie.' });
        recommendations.push('Nie ignoruj tego - to nie zmieni się samo');
        recommendations.push('Postaw granice teraz');

      } else {
        riskLevel = 'low';
        mainTitle = '✅ Dobry start';
        mainDescription = 'Wydajesz się wybrać dobrze.';
        recommendations.push('Monitoruj sygnały - nigdy nie jesteś 100% bezpieczny');
        recommendations.push('Przed ślubem omów: finanse, dzieci, przyszłość');
      }
    }

    if (status === 'engaged') {
      const prenup = finalAnswers.engaged_prenup;

      if (prenup === 'refused') {
        riskLevel = 'critical';
        mainTitle = '🚨 NIE PODPISUJ UMOWY';
        mainDescription = 'Odmowa intercyzy przed ślubem to test. Test czy ją słuchasz bezkrytycznie.';
        scenarios.push({ scenario: 'Rozwód bez zabezpieczenia', chance: 50, explanation: 'Co drugie małżeństwo się rozpada. Bez intercyzy tracisz 50% majątku.' });
        recommendations.push('⚠️ ULTIMATUM: Intercyza lub brak ślubu');
        recommendations.push('⚠️ Jeśli naprawdę Cię kocha, intercyza powinna być OK');
        recommendations.push('⚠️ Odmowa = liczy na prawo rodzinne w swoją korzyść');

      } else if (prenup === 'afraid_ask') {
        riskLevel = 'high';
        mainTitle = '⚠️ Boisz się jej?';
        mainDescription = 'Jeśli boisz się poruszyć temat teraz, będziesz w strachu całe życie.';
        recommendations.push('🔴 To czerwona flaga - zdrowa relacja = możliwość rozmowy');
        recommendations.push('🔴 Poruszyć temat - to Twoje prawo');

      } else {
        riskLevel = 'low';
        mainTitle = '✅ Solidna pozycja';
        mainDescription = 'Przygotowujesz się odpowiedzialnie.';
        recommendations.push('Upewnij się że intercyza jest dobrze napisana');
        recommendations.push('Przejrzyj ją z niezależnym prawnikiem');
      }
    }

    if (status === 'married_happy') {
      const prenup = finalAnswers.married_prenup;
      const fidelity = finalAnswers.married_fidelity;

      if (fidelity === 'confirmed') {
        riskLevel = 'critical';
        mainTitle = '🚨 ZDRADA - Zmienia to grę';
        mainDescription = 'To był wybór, nie błąd. Każdy dzień czekania to jemu dłużej na przygotowanie.';
        scenarios.push({ scenario: 'Rozwód w ciągu roku', chance: 85, explanation: '80% rozwodów inicjują kobiety. Już ma plan.' });
        recommendations.push('🚨 PRIORYTET 1: Adwokat specjalizujący się w rozwodach');
        recommendations.push('🚨 PRIORYTET 2: Zbierz dowody i dokumentację');
        recommendations.push('🚨 PRIORYTET 3: Nie konfrontuj bez planu prawnego');
        recommendations.push('🚨 PRIORYTET 4: Bezpieczeństwo finansowe - oddzielne konta');

      } else if (fidelity === 'suspected') {
        riskLevel = 'high';
        mainTitle = '⚠️ Wyczuwasz zdradę';
        mainDescription = 'Instynkt mężczyzny rzadko się myli. Ale potrzebujesz pewności.';
        recommendations.push('Dokumentuj dziwne zachowania - daty, godziny, osoby');
        recommendations.push('Nie oskarżaj bez dowodów');
        recommendations.push('Dyskretnie zbierz materiały');

      } else {
        riskLevel = 'low';
        mainTitle = '✅ Szczęście - zachowaj to';
        mainDescription = 'Dobrze się masz. Ale zawsze bądź świadomy zagrożeń.';
        recommendations.push('Utrzymuj transparencję finansową');
        recommendations.push('Regularnie sprawdzaj swoje konta');
        recommendations.push('Nawet w dobrym małżeństwie - miej plan B');
      }

      if (prenup === 'no') {
        scenarios.push({ scenario: 'Brak zabezpieczenia finansowego', chance: 100, explanation: 'Bez intercyzy jesteś pod ryzykiem.' });
        recommendations.push('Rozważ intercyzę nawet teraz');
      }
    }

    if (status === 'married_unhappy') {
      riskLevel = 'critical';
      mainTitle = '⚠️ Nieszczęście - przygotuj się';
      mainDescription = 'Nieszczęśliwe małżeństwo zwykle kończy się rozwodem. Statystyka nie jest łaskawa.';
      scenarios.push({ scenario: 'Rozwód w 1-3 latach', chance: 80, explanation: 'Jeśli jesteś nieszczęśliwy, często ona też - lub ma plan.' });
      recommendations.push('⚠️ Skonsultuj się z adwokatem - bez zobowiązań');
      recommendations.push('⚠️ Zbierz dokumenty: rachunki, umowy');
      recommendations.push('⚠️ Otwórz oddzielne konto - dyskretnie');
      recommendations.push('⚠️ Dokumentuj zaangażowanie w dzieci');
      recommendations.push('⚠️ Nie podejmuj dużych wydatków');
    }

    if (status === 'trouble') {
      riskLevel = 'critical';
      mainTitle = '⚠️ KRYZYS - Przygotuj się do walki';
      mainDescription = 'Małżeństwo w kryzysie to pole minowe. Każdy ruch ma konsekwencje.';
      scenarios.push({ scenario: 'Rozwód w ciągu 1-2 lat', chance: 95, explanation: 'Na tym poziomie rzadko się kończy pogodzeniem.' });
      
      explanations.push({
        title: '⚠️ Zasady wojny rozwodowej',
        text: 'To już nie relacja - to bitwa. Dowody > słowa. Pieniądze > uczucia. Adwokat > emocje. Dokumentacja > pamięć. Każda wiadomość może być użyta przeciwko tobie w sądzie.'
      });

      recommendations.push('⚠️ WSZYSTKO w piśmie - brak rozmów');
      recommendations.push('⚠️ WSZYSTKO zanotuj z datą i godziną');
      recommendations.push('⚠️ Nie wysyłaj emocjonalnych wiadomości');
      recommendations.push('⚠️ Zatrudnij NAJLEPSZEGO dostępnego adwokata');
      recommendations.push('⚠️ System faworyzuje matki - przygotuj się na walkę');
    }

    if (status === 'divorce') {
      riskLevel = 'critical';
      mainTitle = '⚖️ W SĄDZIE - Teraz liczy się gra';
      mainDescription = 'Jesteś w procesie. Każdy ruch może kosztować tysiące.';
      
      explanations.push({
        title: '⚖️ Rzeczywistość polskiego sądu',
        text: 'Statystyki: ~85% opieki dla matek, ~95% alimenty od ojców, ~50% podział majątku niezależnie od wkładu. System jest strukturalnie nastawiony na ochronę matki.'
      });

      const lawyer = finalAnswers.divorce_lawyer;
      if (lawyer === 'no' || lawyer === 'mediocre') {
        scenarios.push({ scenario: 'Gorsza reprezentacja prawna', chance: 80, explanation: 'Jeśli jej adwokat jest lepszy - będziesz w defensywie.' });
        recommendations.push('🚨 ZMIEŃ ADWOKATA na lepszego - teraz');
      }

      recommendations.push('⚖️ Słuchaj adwokata w 100%');
      recommendations.push('⚖️ NIE negocjuj bez niego');
      recommendations.push('⚖️ Kontroluj emocje - sędzia obserwuje');
      recommendations.push('⚖️ Wszystko w dokumentach');
    }

    return {
      riskLevel,
      mainTitle,
      mainDescription,
      scenarios,
      explanations,
      recommendations
    };
  };

  const handleAnswer = (value, next) => {
    const currentQuestion = currentPath[currentPath.length - 1];
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (next === 'calculate') {
      setResult(calculateResult(newAnswers));
    } else {
      setCurrentPath([...currentPath, next]);
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      const newPath = [...currentPath];
      const removedQuestion = newPath.pop();
      setCurrentPath(newPath);
      const newAnswers = { ...answers };
      delete newAnswers[removedQuestion];
      setAnswers(newAnswers);
      setResult(null);
    }
  };

  const handleRestart = () => {
    setCurrentPath(['start']);
    setAnswers({});
    setResult(null);
  };

  const getRiskColor = (level) => {
    if (level === 'low') return 'bg-green-600';
    if (level === 'medium') return 'bg-yellow-600';
    if (level === 'high') return 'bg-orange-600';
    return 'bg-red-700';
  };

  const getRiskLabel = (level) => {
    if (level === 'low') return '✅ NISKIE RYZYKO';
    if (level === 'medium') return '⚠️ ŚREDNIE RYZYKO';
    if (level === 'high') return '🔴 WYSOKIE RYZYKO';
    return '🚨 KRYTYCZNE RYZYKO';
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4">
        <div className="max-w-5xl mx-auto py-8">
          <div className="bg-gray-900 rounded-lg shadow-2xl p-8 border border-gray-700">
            <div className={`${getRiskColor(result.riskLevel)} text-white px-8 py-4 rounded-lg mb-8 text-center`}>
              <h2 className="text-3xl font-bold">{getRiskLabel(result.riskLevel)}</h2>
            </div>

            <h1 className="text-4xl font-bold mb-4">{result.mainTitle}</h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{result.mainDescription}</p>

            {result.scenarios.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <TrendingDown className="text-red-500" size={28} />
                  Możliwe Scenariusze
                </h3>
                <div className="space-y-4">
                  {result.scenarios.map((scenario, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg p-5 border-2 border-gray-700 hover:border-red-500 transition">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-lg">{scenario.scenario}</h4>
                        <div className="bg-red-700 px-4 py-2 rounded-lg font-bold text-xl">{scenario.chance}%</div>
                      </div>
                      <p className="text-gray-300">{scenario.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.explanations.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Brain className="text-yellow-500" size={28} />
                  Kluczowe Informacje
                </h3>
                <div className="space-y-4">
                  {result.explanations.map((exp, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg p-5 border-l-4 border-yellow-500">
                      <h4 className="font-bold text-lg mb-2">{exp.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{exp.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Zap className="text-blue-500" size={28} />
                  Rekomendacje
                </h3>
                <div className="bg-gray-800 rounded-lg p-6 border-2 border-blue-600">
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-200">
                        <span className="text-blue-400 font-bold mt-0.5">▸</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
              >
                ↻ Zacznij od nowa
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentPath[currentPath.length - 1]];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-gray-900 rounded-lg shadow-2xl p-8 border border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Heart className="text-red-500" size={32} />
              <h1 className="text-3xl font-bold">Analiza Relacji</h1>
            </div>
            {currentPath.length > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-600"
              >
                <ArrowLeft size={20} />
                Wstecz
              </button>
            )}
          </div>

          <div className="mb-8">
            <div className="bg-gray-800 rounded-full h-3 mb-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((currentPath.length / 20) * 100, 95)}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 text-center">
              Pytanie {currentPath.length}
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-8 leading-relaxed">{currentQuestion.question}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value, option.next)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-left p-5 rounded-lg transition-all border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 text-gray-100 hover:text-white"
              >
                <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarriageQuiz2;