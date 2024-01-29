import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text } from "react-native";
import CurrentSymptoms from "../../components/SymptomTracker/CurrentSymptoms";
import AddSymptomModal from "../../components/SymptomTracker/CreateSymptomModal";
import Symptom from "../../firebaseConnect/data/Symptom";

const SymptomTracker = () => {
	const [addSymptomMode, setAddSymptomMode] = useState(false);
	const [symptoms, setSymptoms] = useState<Symptom[]>([]);

	useEffect(() => {
		// dummy data
		setSymptoms([
			{
				id: "1",
				name: "Fever",
				date: new Date(),
				severity: 7,
				notes: "I have a feverss",
			},
			{
				id: "2",
				name: "Cough",
				date: new Date(),
				severity: 3,
				notes: "I have a cough",
			},
			{
				id: "3",
				name: "QqQ",
				date: new Date(),
				severity: 1,
				notes: "QQ",
			},
		]);
	}, []);

	const handleSaveAddSymptom = (symptom: Symptom) => {
		setSymptoms([...symptoms, symptom]);
		setAddSymptomMode(false);
	};

	const handleChangeCurrentSymptoms = (symptoms: Symptom[]) => {
		setSymptoms(symptoms);
	};

	return (
		<ScrollView
			contentContainerStyle={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>Symptom Tracker</Text>
			<Button title="+ Add Symptom" onPress={() => setAddSymptomMode(true)} />
			<AddSymptomModal
				visible={addSymptomMode}
				onClose={() => setAddSymptomMode(false)}
				onSave={handleSaveAddSymptom}
			/>
			<CurrentSymptoms
				symptoms={symptoms}
				onChange={handleChangeCurrentSymptoms}
			/>
		</ScrollView>
	);
};
export default SymptomTracker;
