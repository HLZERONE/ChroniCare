export const SYMPTOM_KEY = "Symptom";

export class Symptom {
	id: any;
	userId: any;
	diseaseName: string;
	notes: string;
	severity: number;
	duration: number | null;
	date: Date;
	constructor(
		id: any,
		userId : any,
		diseaseName: string,
		severity: number,
		duration: number,
		date: Date = new Date(),
		notes: string = "",
	) {
		this.id = id;
		this.userId = userId;
		this.diseaseName = diseaseName;
		this.notes = notes;
		this.severity = severity;
		this.duration = duration;
		this.date = date;
	}

	toString() {
        return this.diseaseName + ': ' + this.notes;
    }
}

export const symptomConverter = {
	toFirestore: (s: Symptom) => {
		return {
			userId: s.userId,
			diseaseName: s.diseaseName,
			severity: s.severity,
			duration: s.duration,
			date: s.date,
			notes: s.notes,
		};
	},
	fromFirestore: (snapshot: any, id: any) => {
		const data = snapshot.data(id);
		return new Symptom(id, data.userId, data.diseaseName, data.severity, data.duration, data.date, data.notes);
	},
};

export default Symptom;
