import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Sample {
	List<String> boys=new ArrayList<>();
	List<String> girls=new ArrayList<>();
	List<String> boys1=new ArrayList<>();
	List<String> girls1=new ArrayList<>();
	private String getBloodGroup(){
		List<String> givenList = Arrays.asList("A Positive","A Negative","B Positive","B Negative",
				"AB Positive","AB Negative","O Positive","O Negative","Unknown");
	    Random rand = new Random();
	    String randomElement = givenList.get(rand.nextInt(givenList.size()));
	    return randomElement;
	}
	
	private String getAddress(){
		List<String> givenList = Arrays.asList("Chennai","Madhurai","Salem","New Delhi","Bangalore","Coimbatore",
				"Ariyalur","Perambalur","Mumbai","Pune");
	    Random rand = new Random();
	    String randomElement = givenList.get(rand.nextInt(givenList.size()));
	    return randomElement;
	}
	private String getSpecialization(){
		List<String> givenList = Arrays.asList("General","Pediatrician","Gynaecologist","Neurologist","ENT Specialist");
	    Random rand = new Random();
	    String randomElement = givenList.get(rand.nextInt(givenList.size()));
	    return randomElement;
	}
	
	private String getDoctorName(){
		List<String> givenList = Arrays.asList("Gunasekaran","Pavithra","Mathimaran","Senthil");
	    Random rand = new Random();
	    String randomElement = givenList.get(rand.nextInt(givenList.size()));
	    return randomElement;
	}
	
	private String getDiagnosis(){
		List<String> givenList = Arrays.asList("Fever","Headache","Stomach Pain","Genral Checkup","Dizziness","EYE Disorder","Vertigo","Tooth Pathology");
	    Random rand = new Random();
	    String randomElement = givenList.get(rand.nextInt(givenList.size()));
	    return randomElement;
	}
	
	private String getRandomChar(){
		final String alphabet = "ABCDEFGHIJKLMNPSTV";
	    final int N = alphabet.length();

	    Random r = new Random();

	    return String.valueOf(alphabet.charAt(r.nextInt(N)));
	}
	private static String randomDataOfBirth(int yearStart, int yearEnd) throws Exception
    {
        GregorianCalendar gc = new GregorianCalendar();
        int year = randBetween(yearStart, yearEnd);
        gc.set(Calendar.YEAR, year);
         int dayOfYear = randBetween(1, gc.getActualMaximum(Calendar.DAY_OF_YEAR));

            gc.set(Calendar.DAY_OF_YEAR, dayOfYear);
            String date = null;
            SimpleDateFormat sdf=new SimpleDateFormat("YYYY-MM-dd");
            if(gc.get(Calendar.MONTH) == 0)
            {
                 date = sdf.format(sdf.parse(gc.get(Calendar.YEAR) + "-" + 1 + "-" + gc.get(Calendar.DAY_OF_MONTH)));
            }else
            {
                 date = sdf.format(sdf.parse(gc.get(Calendar.YEAR) + "-" + gc.get(Calendar.MONTH) + "-" + gc.get(Calendar.DAY_OF_MONTH)));
            }
            return date;    
    }
	
	private static int randBetween(int start, int end) {
        // TODO Auto-generated method stub
         return start + (int)Math.round(Math.random() * (end - start));
    }
	
	public long generateNumber()
	{
	  return (long)(Math.random()*100000 + 9845200000L);
	}
	
	private void readFile() throws Exception{
		File file1 = new File("C:\\Users\\42539\\Desktop\\boys.txt"); 
		File file2= new File("C:\\Users\\42539\\Desktop\\girls.txt"); 
		  
		  BufferedReader br1 = new BufferedReader(new FileReader(file1)); 
		  BufferedReader br2 = new BufferedReader(new FileReader(file2)); 
		  
		  String st; 
		  while ((st = br1.readLine()) != null) {
		    boys.add(st); 
		  } 
		  
		  String st1; 
		  while ((st1 = br2.readLine()) != null) {
		    girls.add(st1); 
		  } 
	}
	
	private void myMethod() throws Exception{
		SimpleDateFormat sdf=new SimpleDateFormat("YYYY-MM-dd");
		List<Patient> patients=new ArrayList<>();
		readFile();
		System.out.println(boys);
		System.out.println(girls);
		
		for(int i=1;i<=500;i++){
			Patient p=new Patient();
			p.setId(i);
			p.setLastName(getRandomChar());
			p.setDob(Sample.randomDataOfBirth(1985,2000));
			if(i%10 == 0){
				p.setFirstName(girls.get(i));
				p.setGender(Gender.Female);
			}else{
				p.setFirstName(boys.get(i));
				p.setGender(Gender.Male);
				
			}
			
			p.setPhoneNumber(generateNumber());
			p.setEmail(p.getFirstName().trim()+"@gmail.com");
			p.setBloodGroup(getBloodGroup());
			p.setAddress(getAddress());
			p.setSpecialization(getSpecialization());
			p.setDoctorName(getDoctorName());
			p.setDiagnosis(getDiagnosis());
			p.setCreatedDate(sdf.format(new Date()));			
			patients.add(p);
		}
		ObjectMapper mapper = new ObjectMapper();
		// jackson-annotations-2.2.3  jackson-core-2.2.3 jackson-databind-2.2.3
		try(FileWriter file = new FileWriter("D:\\ponselva\\Sample\\src\\pms.json"))
        {
            //String json = mapper.writeValueAsString(patients);
            //System.out.println(json);
 
            //Use pretty print for printing the output
            String beutifulJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(patients);
            //System.out.println(beutifulJson);
            file.write(beutifulJson);
 
        } catch (JsonGenerationException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
	public static void main(String[] args) throws Exception{
		Sample sample=new Sample();
		sample.myMethod();
		}
	}
