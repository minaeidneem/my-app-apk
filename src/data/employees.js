export const INITIAL_EMPLOYEES = [
  "Bill McBride", "Bill Simon", "Billy Crystal", "Binyamin Ben-Eliezer", 
  "Bob Graham", "Bob Hope", "Britney Spears", "Elizabeth Smart", 
  "Elton John", "David Beckham", "David Heymann", "David Nalbandian", 
  "David Trimble", "David Wells", "Dennis Hastert", "Dennis Kucinich", 
  "Denzel Washington", "Diana Krall", "Dick Cheney", "Dominique de Villepin", 
  "Donald Rumsfeld", "Edmund Stoiber", "Eduard Shevardnadze", 
  "Eduardo Duhalde", "Edward Lu", "Elizabeth Hurley", "Elsa Zylberstein", 
  "Emanuel Ginobili"
].map((name, index) => ({
  id: index + 1,
  name,
  role: "Team Member",
  status: Math.random() > 0.3 ? "Active" : "Away",
  lastSeen: "Just now",
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
  email: `${name.toLowerCase().replace(" ", ".")}@company.com`,
  department: ["Engineering", "Product", "Design", "Marketing"][Math.floor(Math.random() * 4)]
}));
