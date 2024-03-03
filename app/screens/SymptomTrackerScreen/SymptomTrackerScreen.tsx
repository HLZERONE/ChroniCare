import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import CurrentSymptoms from "../../components/SymptomTracker/CurrentSymptoms";
import AddSymptomModal from "../../components/SymptomTracker/AddSymptomModal";
import Symptom from "../../firebaseConnect/data/Symptom";
import PastSymptoms from "../../components/SymptomTracker/PastSymptoms/PastSymptoms";
import { addSymptomInfo, batchUpdateSymptomInfo, getAllSymptomInfoByUser, updateSymptomInfo } from "../../firebaseConnect/SymptomInfo";
import { currentUser } from "../../firebaseConnect/CurrentUserInfo";

export interface NewSymptom {
	diseaseName: string;
	duration: number | null;
	date: Date;
	severity: number;
	notes: string;
}

const SymptomTracker = () => {
	const [addSymptomMode, setAddSymptomMode] = useState(false);
	const [symptoms, setSymptoms] = useState<Symptom[]>([]);

	useEffect(() => {
		// Fetch symptoms from database
		getAllSymptomInfoByUser(currentUser?.uid).then((symptoms) => {
			setSymptoms(symptoms);
		});
		return () => {};
	}, []);

	const handleSaveAddSymptom = (newSymptom: NewSymptom) => {
		addSymptomInfo(newSymptom.diseaseName, newSymptom.notes, newSymptom.severity, 1, newSymptom.date).then((symptom) => {
			setSymptoms([...symptoms, symptom]);
		}).finally(() => {
			setAddSymptomMode(false);
		});
	};

	const handleChangeCurrentSymptoms = (symptoms: Symptom[]) => {
		// Update symptoms in database
		batchUpdateSymptomInfo(symptoms);
		setSymptoms(symptoms);
	};

	return (
		<SafeAreaView style={{
			flex: 1,
			backgroundColor: 'rgba(117, 196, 205, 0.19)',
		}}>
			<ScrollView
				contentContainerStyle={{
					justifyContent: "center",
					alignItems: "center",
					paddingBottom: 40,
				}}
				style={styles.container}
			>
				<Text style={styles.headerStyle}>Symptom Tracker</Text>
				<Pressable onPress={() => setAddSymptomMode(true)} style={styles.button}>
					<Text style={styles.buttonText}>+ Add Symptom</Text>
				</Pressable>
				<AddSymptomModal
					visible={addSymptomMode}
					onClose={() => setAddSymptomMode(false)}
					onSave={handleSaveAddSymptom}
				/>
				<CurrentSymptoms
					symptoms={symptoms}
					onChange={handleChangeCurrentSymptoms}
				/>
				<PastSymptoms symptoms={symptoms}/>
			</ScrollView>
		</SafeAreaView>
	);
};
export default SymptomTracker;

const styles = StyleSheet.create({
	headerStyle: {
	  fontSize: 30, // Larger font size for headers
	  fontWeight: 'bold', // Bold font weight to make it stand out
	  color: '#000', // Typically, headers are in a darker or different color
	  textAlign: 'center', // Center-aligned text is common for headers
	  marginBottom: 10, // Optional: add some margin to the bottom for spacing
	},
	container: {
		paddingVertical: 24,
	},
	button: {
		backgroundColor: '#1EAFB3',
		padding: 15,
		borderRadius: 30,
		marginVertical: 10,
		width: '50%',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
	},
  });