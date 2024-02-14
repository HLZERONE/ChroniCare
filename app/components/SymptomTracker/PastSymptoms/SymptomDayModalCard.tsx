import Symptom from "../../../firebaseConnect/data/Symptom";
import { View, Text, StyleSheet } from "react-native";

interface SymptomDayModalCardProps {
    Symptom: Symptom;
}

const SymptomDayModalCard: React.FC<SymptomDayModalCardProps> = ({ Symptom }) => {
    return (
        <View style={styles.card}>
            <View style={styles.title}>
                <Text style={styles.symptomName}>{Symptom.name}</Text>
                <Text style={[styles.severity, styles.titleSeverity]}>{Symptom.severity}</Text>
            </View>
            <Text>Pain Level</Text>
            <Text style={styles.severity}>Severity: {Symptom.severity}</Text>
            <Text>Notes</Text>
            <Text style={styles.notes}>{Symptom.notes}</Text>
        </View>
    );
};

export default SymptomDayModalCard;

// Styles
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'lightgrey',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    symptomName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    severity: {
        fontSize: 15,
        marginBottom: 5,
    },
    titleSeverity: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    notes: {
        fontSize: 12, // Adjusted for better readability
    },
});