class Symptom {
	id: string;
	name: string;
	notes: string;
	severity: number;
	date: Date;
	constructor(
		id: string,
		name: string,
		notes: string,
		severity: number,
		date: Date
	) {
		this.id = id;
		this.name = name;
		this.notes = notes;
		this.severity = severity;
		this.date = date;
	}
}

export const symptomConverter = {
	toFirestore: (s: Symptom) => {
		return {
			name: s.name,
			notes: s.notes,
			date: s.date,
		};
	},
	fromFirestore: (snapshot: any, id: any) => {
		const data = snapshot.data(id);
		return new Symptom(id, data.name, data.notes, data.severity, data.date);
	},
};

export default Symptom;
