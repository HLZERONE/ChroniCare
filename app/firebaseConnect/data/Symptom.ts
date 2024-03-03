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
		notes: string,
		severity: number,
		duration: number,
		date: Date
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
			notes: s.notes,
			severity: s.severity,
			duration: s.duration,
			date: s.date,
		};
	},
	fromFirestore: (snapshot: any) => {
		const data = snapshot.data();
		data.date = data.date.toDate();
		return new Symptom(snapshot.id, data.userId, data.diseaseName, data.notes, data.severity, data.duration, data.date);
	},
};

export default Symptom;