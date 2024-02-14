import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Symptom from "../../../firebaseConnect/data/Symptom";
import { FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import SymptomDayModal from "./SymptomDayModal";


interface PastSymptomsProps {
    symptoms: Symptom[];
}

// This component is responsible for displaying the past symptoms
// Symptoms are accessible through the calendar view
// Date that has symptoms will be marked with a dot

const PastSymptoms: React.FC<PastSymptomsProps> = ({ symptoms }) => {
    const [markedDates, setMarkedDates] = useState<any>({});
    const [dayModalOpened, setDayModalOpened] = useState(false);
    const [selectedDateSymptoms, setSelectedDateSymptoms] = useState<Symptom[]>([]);

    useEffect(() => {
        const markedDates = symptoms.reduce((acc, symptom) => {
            const date = new Date(symptom.date);
            const dateString = date.toISOString().split("T")[0];
            return {
                ...acc,
                [dateString]: { marked: true },
            };
        }, {});
        setMarkedDates(markedDates);
    }, [symptoms]);

    return (
        <View style={styles.container}>
            <SymptomDayModal Symptoms={symptoms} visible={dayModalOpened} onClose={() => {
                setDayModalOpened(false);
                setSelectedDateSymptoms([]);
            }} />
            <Calendar
                markedDates={markedDates}
                onDayPress={(day) => {
                    const date = new Date(day.dateString);
                    const symptomsOnDate = symptoms.filter((symptom) => {
                        const symptomDate = new Date(symptom.date);
                        return symptomDate.toISOString().split("T")[0] === date.toISOString().split("T")[0];
                    });
                    setSelectedDateSymptoms(symptomsOnDate);
                    setDayModalOpened(true);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});

export default PastSymptoms;