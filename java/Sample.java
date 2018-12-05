import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
/**
jackson-annotations-2.2.3
jackson-core-2.2.3
jackson-databind-2.2.3
**?
public class Sample {
	public static void main(String[] args) {
		SimpleDateFormat sdf=new SimpleDateFormat("dd-MM-YYYY");
		List<Patient> patients=new ArrayList<>();
		for(int i=1;i<=1000;i++){
			Patient p=new Patient();
			p.setPatientId(i);
			p.setPatientName("Name "+i);
			p.setAddress("Chennai");
			p.setCreatedDate(sdf.format(new Date()));
			p.setDob(sdf.format(new Date()));
			p.setDiagnosis("Fever");
			p.setDoctorName("Gunasekaran");
			p.setPhoneNumber(123456789+i);
			p.setEmail(i+"@gmail.com");
			if(i%10 == 0){
				p.setGender(Gender.MALE);
			}else{
				p.setGender(Gender.FEMALE);	
			}
			patients.add(p);
		}
		ObjectMapper mapper = new ObjectMapper();
		try(FileWriter file = new FileWriter("D:\\ponselva\\Sample\\src\\pms.json"))
        {
            //String json = mapper.writeValueAsString(patients);
            //System.out.println(json);
 
            //Use pretty print for printing the output
            String beutifulJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(patients);
            System.out.println(beutifulJson);
            file.write(beutifulJson);
 
        } catch (JsonGenerationException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
		

	}
