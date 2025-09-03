type PromptSuggestionsProps = {
  label: string;
  append: (message: { role: 'user'; content: string }) => void;
  suggestions: string[];
};

export function PromptSuggestions({
  label,
  append,
  suggestions,
}: PromptSuggestionsProps) {
  return (
    <div className="mb-6 space-y-6">
      <h2 className="text-center text-2xl font-bold">{label}</h2>
      <div className="flex w-full flex-wrap gap-x-6 gap-y-4 text-sm">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: 'user', content: suggestion })}
            className="bg-muted/50 hover:bg-muted h-max cursor-pointer rounded-xl border px-4 py-2"
          >
            <p>{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
