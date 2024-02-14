import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, StyleSheet } from "react-native";
import CurrentSymptoms from "../../components/SymptomTracker/CurrentSymptoms";
import AddSymptomModal from "../../components/SymptomTracker/CreateSymptomModal";
import Symptom from "../../firebaseConnect/data/Symptom";
import PastSymptoms from "../../components/SymptomTracker/PastSymptoms/PastSymptoms";

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
			<Text style={styles.headerStyle}>Symptom Tracker</Text>
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
			<PastSymptoms symptoms={symptoms} />
		</ScrollView>
	);
};
export default SymptomTracker;

const styles = StyleSheet.create({
	headerStyle: {
	  fontSize: 24, // Larger font size for headers
	  fontWeight: 'bold', // Bold font weight to make it stand out
	  color: '#000', // Typically, headers are in a darker or different color
	  textAlign: 'center', // Center-aligned text is common for headers
	  marginTop: 20, // Optional: add some margin to the top for spacing
	  marginBottom: 10, // Optional: add some margin to the bottom for spacing
	},
  });
