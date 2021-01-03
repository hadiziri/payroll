package com.sonatrach.dz;

import java.io.File;

import java.io.FileNotFoundException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sonatrach.dz.banque.domain.Banque;
import com.sonatrach.dz.banque.repo.BanqueRepo;
import com.sonatrach.dz.chang.domain.Change;
import com.sonatrach.dz.chang.repo.ChangRepo;
import com.sonatrach.dz.cloturePaie.domain.CloturePaie;
import com.sonatrach.dz.cloturePaie.repo.CloturePaieRepo;
import com.sonatrach.dz.dep.domain.Dep;
import com.sonatrach.dz.dep.repo.DepRepo;
import com.sonatrach.dz.diplome.domain.Diplome;
import com.sonatrach.dz.diplome.repo.DiplomeRepo;
import com.sonatrach.dz.fileToPrint.domain.FileToPrint;
import com.sonatrach.dz.fileToPrint.repo.FileToPrintRepo;
import com.sonatrach.dz.fonction.domain.Fonction;
import com.sonatrach.dz.fonction.repo.FonctionRepo;
import com.sonatrach.dz.localite.domain.Localite;
import com.sonatrach.dz.localite.repo.LocaliteRepo;
import com.sonatrach.dz.message.request.LoginForm;
import com.sonatrach.dz.message.request.SignUpForm;
import com.sonatrach.dz.message.response.JwtResponse;
import com.sonatrach.dz.message.response.ResponseMessage;
import com.sonatrach.dz.model.User;
import com.sonatrach.dz.newpaie.domain.NewPaie;
import com.sonatrach.dz.newpaie.repo.NewPaieRepo;
import com.sonatrach.dz.paymonth.domain.PayMonth;
import com.sonatrach.dz.paymonth.repo.PayMonthRepo;
import com.sonatrach.dz.pays.domain.Pays;
import com.sonatrach.dz.pays.repo.PaysRepo;
import com.sonatrach.dz.pers.domain.Pers;
import com.sonatrach.dz.pers.repo.PersRepo;
import com.sonatrach.dz.repository.UserRepository;
import com.sonatrach.dz.rubAlph.domain.RubAlph;
import com.sonatrach.dz.rubAlph.repo.RubAlphRepo;
import com.sonatrach.dz.rubNum.RubNum;
import com.sonatrach.dz.rubNum.domain.RubNumRepo;
import com.sonatrach.dz.rubrique.domain.Rubrique;
import com.sonatrach.dz.rubrique.repo.RubriqueRepo;
import com.sonatrach.dz.security.jwt.JwtProvider;
import com.sonatrach.dz.structure.domain.Structure;
import com.sonatrach.dz.structure.repo.StructureRepo;
import com.sonatrach.dz.tabstructure.domain.TabStructure;
import com.sonatrach.dz.tabstructure.repo.TabStructureRepo;

import ch.qos.logback.core.net.SyslogOutputStream;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.data.JRCsvDataSource;
import net.sf.jasperreports.engine.export.JRTextExporter;
import net.sf.jasperreports.engine.export.JRTextExporterParameter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;

/*
 * Developped by : AID FERIEL for SONATRACH --2020--
 * Email:aidferiel@gmail.com
 */
@RestController
@CrossOrigin("http://localhost:4200")
public class Controller {
	// **********************************************repositories************************************************************
	@Autowired
	BanqueRepo banqueRepo;
	@Autowired
	StructureRepo structureRepo;
	@Autowired
	CloturePaieRepo clotureRepo;
	@Autowired
	DiplomeRepo diplomeRepo;
	@Autowired
	FonctionRepo fonctionRepo;
	@Autowired
	LocaliteRepo localiteRepo;
	@Autowired
	PaysRepo paysRepo;
	@Autowired
	RubriqueRepo rubriqueRepo;
	@Autowired
	TabStructureRepo tabStructureRepo;
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	JwtProvider jwtProvider;
	@Autowired
	DepRepo depRepo;
	@Autowired
	ChangRepo changRepo;
	@Autowired
	PayMonthRepo paymonthRepo;
	@Autowired
	NewPaieRepo newPaieRepo;
	@Autowired
	PersRepo persRepo;
	@Autowired
	RubAlphRepo rubAlphRepo;
	@Autowired
	RubNumRepo rubNumRepo;
	@Autowired
	FileToPrintRepo fileToPrintRepo;

	// ****************************************API*****************************************************************************
	@GetMapping({ "/allBanques" })
	public List<RubAlph> getAllBanques() {
		return rubAlphRepo.findAll();
	}

	@GetMapping({ "/getAllStructures" })
	public List<Structure> getAllStructures() {
		List<Structure> lesStructures = new ArrayList();
		try {
			lesStructures = structureRepo.findAll();
			return lesStructures;
		} catch (Exception e) {
			System.out.println("Exception getAllStructures()==>" + e.getMessage());
		}
		return lesStructures;
	}

	@GetMapping({ "generateTableFiles" })
	public List<CloturePaie> cloturePaie() {
		List<CloturePaie> toutLesFichiers = new ArrayList();

		try {

			// ***************************get all files to generate and its directory path
			toutLesFichiers = clotureRepo.findAll();
			for (int i = 0; i < toutLesFichiers.size(); i++) {
				String path = toutLesFichiers.get(i).getFOLDERPATH();
				String folderName = toutLesFichiers.get(i).getFOLDERNAME();
				String fileName = toutLesFichiers.get(i).getPREFIXFILETYPE();
				String description = toutLesFichiers.get(i).getDESCFILETYPE().toString();
				generateFiles(path, folderName, fileName, description);
			}

		} catch (Exception e) {

			System.out.println("Erreur lors de la génération des fichiers:   " + e.getMessage());
		}

		return toutLesFichiers;
	}

	@GetMapping({ "generateFrubA" })
	public List<CloturePaie> generateFrubA() throws FileNotFoundException, JRException {
		List<CloturePaie> fileFrub = new ArrayList();
		try {

			fileFrub = clotureRepo.findByDesc("frubA");
			List<RubAlph> lesFrubAlph = rubAlphRepo.findAll();

			// **********************************************get current date from payMonth

			PayMonth currentDate = paymonthRepo.findByState();
			String currentYear = currentDate.getPaymonth().substring(0, 4);
			String currentMonth = currentDate.getPaymonth().substring(4, 6);
			String dateFormat = currentYear + "-" + currentMonth;

			// ********************************folder generation if not exist
			String pathWithYear = fileFrub.get(0).getFOLDERPATH() + fileFrub.get(0).getFOLDERNAME() + "\\"
					+ currentYear;
			String pathWithMounth = pathWithYear + "\\" + dateFormat;
			File fileYear = new File(pathWithYear);
			if (!fileYear.exists()) {
				fileYear.mkdir();
			}
			File fileMounth = new File(pathWithMounth);
			if (!fileMounth.exists()) {
				fileMounth.mkdir();
			}
			// load file and compile it
			File filerubA = ResourceUtils.getFile("classpath:rubAlph.jrxml");
			JasperReport jasperReport12 = JasperCompileManager.compileReport(filerubA.getAbsolutePath());
			JRBeanCollectionDataSource dataSource12 = new JRBeanCollectionDataSource(lesFrubAlph);
			JasperPrint jasperPrint12 = JasperFillManager.fillReport(jasperReport12, null, dataSource12);
			JRXlsxExporter exporter12 = new JRXlsxExporter();
			exporter12.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
			exporter12.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
			exporter12.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint12);
			Object outputFileName12 = pathWithMounth + "\\" + fileFrub.get(0).getPREFIXFILETYPE() + " " + dateFormat
					+ ".xlsx";
			exporter12.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName12);
			exporter12.exportReport();
			return fileFrub;

		} catch (Exception e) {
			System.out.println(e.getMessage() + "==>while generating FRUBALPH");
		}
		return fileFrub;

	}

	@RequestMapping(value = "/api/auth/signin", method = RequestMethod.POST)
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

		Optional<User> currentUser = userRepository.findByUsername(loginRequest.getUsername());

		if (currentUser.get().getState() == 1) {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			String jwt = jwtProvider.generateJwtToken(authentication);

			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername()));
		} else {
			String error = "xx" + "." + "yy" + "." + "zz";
			return ResponseEntity.ok(new JwtResponse(error, currentUser.get().getUsername()));
		}

	}

	@RequestMapping(value = "/api/auth/signup", method = RequestMethod.POST)
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), 0);

		userRepository.save(user);

		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
	}

	@GetMapping({ "getAllUsers" })
	public List<User> getAllUsers() {
		List<User> allUsers = new ArrayList();
		try {
			allUsers = userRepository.findAll();
			return allUsers;
		} catch (Exception e) {
			System.out.println("Exception while getting all users==>" + e.getMessage());
		}
		return allUsers;
	}

	@PostMapping({ "updateUser" })
	public Optional<User> updateUser(@PathVariable Long id) {
		Optional<User> currentUser = userRepository.findById(id);
		currentUser.get().setState(1);
		// implementer l'insertion au niveau de la table ROLEUSERS
		return currentUser;
	}

	// for settings : changer psw
	@PostMapping({ "updatePsw" })
	public User updatePsw(@RequestBody User u) {
		Optional<User> currentUser = userRepository.findByUsername(u.getUsername());
		User user = new User();
		if (currentUser != null) {
			currentUser.get().setPassword(encoder.encode(u.getPassword()));
			user.setIduser(currentUser.get().getIduser());
			user.setEmail(currentUser.get().getEmail());
			user.setName(currentUser.get().getName());
			user.setPassword(currentUser.get().getPassword());
			user.setState(currentUser.get().getState());
			user.setUsername(currentUser.get().getUsername());
			userRepository.save(user);
		}
		return user;

	}

	// for settings : avoir tout les etats paie pour séléctionner les etat à
	// imprimer
	@GetMapping({ "allEtats" })
	public List<CloturePaie> getAllEtat() {
		List<CloturePaie> toutLesEtats = new ArrayList();
		try {

			// ***************************get all files to generate and its directory path
			toutLesEtats = clotureRepo.findByDesc("etat");
			return toutLesEtats;

		} catch (Exception e) {

			System.out.println("Erreur lors de la génération des fichiers:   " + e.getMessage());
		}

		return toutLesEtats;
	}

	// for settings:pour avoir l'etat actuel des FileToPrint
	@GetMapping({ "allFileToPrint" })
	public List<FileToPrint> getAllFileToPrint() {
		List<FileToPrint> files = new ArrayList();
		try {
			files = fileToPrintRepo.findAll();
			return files;
		} catch (Exception e) {
			System.out.println("Exception while getting all file to print==>" + e.getMessage());
		}
		return files;
	}

	// for settings : pour avoir les etats selectionnés pour chaque structure
	@PostMapping({ "selectedEtats" })
	public List<FileToPrint> getSelectedEtat(@RequestBody FileToPrint f) {
		List<FileToPrint> files = new ArrayList();
		try {
			files = fileToPrintRepo.findByStructure(f.getIdStructure());

			return files;
		} catch (Exception e) {
			System.out.println("Exception while getting getSelectedEtat==>" + e.getMessage());
		}
		return files;
	}

	// to save file to print foreach sturucture choosed by user
	@PostMapping({ "saveFileToPrint" })
	public List<FileToPrint> saveFileToPrint(@RequestBody List<FileToPrint> files) {
		Date date = new Date();
		try {
			for (int i = 0; i < files.size(); i++) {
				FileToPrint myFile = new FileToPrint();
				myFile.setAddedDate(date);
				myFile.setIdFileType(files.get(i).getIdFileType());
				myFile.setIdStructure(files.get(i).getIdStructure());

				fileToPrintRepo.save(myFile);
			}
			return files;
		} catch (Exception e) {
			System.out.println("Exception while saving file to print ==>" + e.getMessage());
		}

		return null;

	}

	@PostMapping({"deleteFileToPrint"})
	public List<FileToPrint> deleteFileToPrint(@RequestBody List<FileToPrint> files) {
		try {
			for (int i = 0; i < files.size(); i++) {
			

				fileToPrintRepo.delete(files.get(i));;
			}
			return files;
		} catch (Exception e) {
			System.out.println("Exception while saving file to print ==>" + e.getMessage());
		}

		return null;
	}

	// ****************************************************Methodes****************************************************************

	// ----To generate Table files (DIN-DRH==>cloture paie)------
	private void generateFiles(String path, String folderName, String fileName, String description)
			throws FileNotFoundException, JRException {

		
			// **********************************************get current date from payMonth

			PayMonth currentDate = paymonthRepo.findByState();
			String currentYear = currentDate.getPaymonth().substring(0, 4);
			String currentMonth = currentDate.getPaymonth().substring(4, 6);
			String dateFormat = currentYear + "-" + currentMonth;

			// ********************************folder generation if not exist
			String pathWithYear = path + folderName + "\\" + currentYear;
			String pathWithMounth = pathWithYear + "\\" + dateFormat;
			File fileYear = new File(pathWithYear);
			if (!fileYear.exists()) {
				fileYear.mkdir();
			}
			File fileMounth = new File(pathWithMounth);
			if (!fileMounth.exists()) {
				fileMounth.mkdir();
			}

			switch (description) {
			case "banque":
				List<Banque> lesBanques = banqueRepo.findAll();
				// load file and compile it
				File file = ResourceUtils.getFile("classpath:lesBanques.jrxml");
				JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
				JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(lesBanques);
				JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, null, dataSource);
				JRXlsxExporter exporter = new JRXlsxExporter();
				exporter.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
				Object outputFileName = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName);
				exporter.exportReport();
				break;

			case "diplome":
				List<Diplome> lesDiplomes = diplomeRepo.findAll();
				// load file and compile it
				File fileDiplome = ResourceUtils.getFile("classpath:lesDiplomes.jrxml");
				JasperReport jasperReport2 = JasperCompileManager.compileReport(fileDiplome.getAbsolutePath());
				JRBeanCollectionDataSource dataSource2 = new JRBeanCollectionDataSource(lesDiplomes);
				JasperPrint jasperPrint2 = JasperFillManager.fillReport(jasperReport2, null, dataSource2);
				JRXlsxExporter exporter2 = new JRXlsxExporter();
				exporter2.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter2.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter2.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint2);
				Object outputFileName2 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter2.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName2);
				exporter2.exportReport();
				break;

			case "fonction":
				List<Fonction> lesFonctions = fonctionRepo.findAll();
				// load file and compile it
				File fileFonctions = ResourceUtils.getFile("classpath:lesFonctions.jrxml");
				JasperReport jasperReport3 = JasperCompileManager.compileReport(fileFonctions.getAbsolutePath());
				JRBeanCollectionDataSource dataSource3 = new JRBeanCollectionDataSource(lesFonctions);
				JasperPrint jasperPrint3 = JasperFillManager.fillReport(jasperReport3, null, dataSource3);
				JRXlsxExporter exporter3 = new JRXlsxExporter();
				exporter3.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter3.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter3.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint3);
				Object outputFileName3 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter3.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName3);
				exporter3.exportReport();
				break;

			case "localite":
				List<Localite> lesLocalites = localiteRepo.findAll();
				// load file and compile it
				File fileLocalite = ResourceUtils.getFile("classpath:lesLocalites.jrxml");
				JasperReport jasperReport4 = JasperCompileManager.compileReport(fileLocalite.getAbsolutePath());
				JRBeanCollectionDataSource dataSource4 = new JRBeanCollectionDataSource(lesLocalites);
				JasperPrint jasperPrint4 = JasperFillManager.fillReport(jasperReport4, null, dataSource4);
				JRXlsxExporter exporter4 = new JRXlsxExporter();
				exporter4.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter4.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter4.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint4);
				Object outputFileName4 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter4.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName4);
				exporter4.exportReport();
				break;

			case "pays":
				List<Pays> lesPays = paysRepo.findAll();
				// load file and compile it
				File filePays = ResourceUtils.getFile("classpath:lesPays.jrxml");
				JasperReport jasperReport5 = JasperCompileManager.compileReport(filePays.getAbsolutePath());
				JRBeanCollectionDataSource dataSource5 = new JRBeanCollectionDataSource(lesPays);
				JasperPrint jasperPrint5 = JasperFillManager.fillReport(jasperReport5, null, dataSource5);
				JRXlsxExporter exporter5 = new JRXlsxExporter();
				exporter5.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter5.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter5.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint5);
				Object outputFileName5 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter5.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName5);
				exporter5.exportReport();
				break;

			case "rubrique":
				List<Rubrique> lesRubriques = rubriqueRepo.findAll();
				// load file and compile it
				File fileRubrique = ResourceUtils.getFile("classpath:lesRubriques.jrxml");
				JasperReport jasperReport6 = JasperCompileManager.compileReport(fileRubrique.getAbsolutePath());
				JRBeanCollectionDataSource dataSource6 = new JRBeanCollectionDataSource(lesRubriques);
				JasperPrint jasperPrint6 = JasperFillManager.fillReport(jasperReport6, null, dataSource6);
				JRXlsxExporter exporter6 = new JRXlsxExporter();
				exporter6.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter6.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter6.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint6);
				Object outputFileName6 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter6.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName6);
				exporter6.exportReport();
				break;

			case "structure":
				List<TabStructure> lesTabStructures = tabStructureRepo.findAll();
				// load file and compile it
				File fileTabStructure = ResourceUtils.getFile("classpath:lesTabStructures.jrxml");
				JasperReport jasperReport7 = JasperCompileManager.compileReport(fileTabStructure.getAbsolutePath());
				JRBeanCollectionDataSource dataSource7 = new JRBeanCollectionDataSource(lesTabStructures);
				JasperPrint jasperPrint7 = JasperFillManager.fillReport(jasperReport7, null, dataSource7);
				JRXlsxExporter exporter7 = new JRXlsxExporter();
				exporter7.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter7.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter7.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint7);
				Object outputFileName7 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter7.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName7);
				exporter7.exportReport();
				break;

			case "change":
				List<Change> lesChanges = changRepo.findAll();
				// load file and compile it
				File fileChange = ResourceUtils.getFile("classpath:change.jrxml");
				JasperReport jasperReport8 = JasperCompileManager.compileReport(fileChange.getAbsolutePath());
				JRBeanCollectionDataSource dataSource8 = new JRBeanCollectionDataSource(lesChanges);
				JasperPrint jasperPrint8 = JasperFillManager.fillReport(jasperReport8, null, dataSource8);
				JRXlsxExporter exporter8 = new JRXlsxExporter();
				exporter8.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter8.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter8.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint8);
				Object outputFileName8 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter8.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName8);
				exporter8.exportReport();
				break;

			case "dep":
				List<Dep> lesDeps = depRepo.findAll();
				// load file and compile it
				File fileDep = ResourceUtils.getFile("classpath:dep.jrxml");
				JasperReport jasperReport9 = JasperCompileManager.compileReport(fileDep.getAbsolutePath());
				JRBeanCollectionDataSource dataSource9 = new JRBeanCollectionDataSource(lesDeps);
				JasperPrint jasperPrint9 = JasperFillManager.fillReport(jasperReport9, null, dataSource9);
				JRXlsxExporter exporter9 = new JRXlsxExporter();
				exporter9.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter9.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter9.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint9);
				Object outputFileName9 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter9.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName9);
				exporter9.exportReport();
				break;

			case "newpaie":
				List<NewPaie> lesNewpaie = newPaieRepo.findAll();
				// load file and compile it
				File fileNewpaie = ResourceUtils.getFile("classpath:newPaie.jrxml");
				JasperReport jasperReport10 = JasperCompileManager.compileReport(fileNewpaie .getAbsolutePath());
				JRBeanCollectionDataSource dataSource10 = new JRBeanCollectionDataSource(lesNewpaie);
				JasperPrint jasperPrint10 = JasperFillManager.fillReport(jasperReport10, null, dataSource10);
				JRXlsxExporter exporter10= new JRXlsxExporter();
				exporter10.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter10.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter10.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint10);
				Object outputFileName10 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter10.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName10);
				exporter10.exportReport();
				break;
				
			case "pers":
				List<Pers> lesPers = persRepo.findAll();
				// load file and compile it
				File filePers = ResourceUtils.getFile("classpath:pers.jrxml");
				JasperReport jasperReport11 = JasperCompileManager.compileReport(filePers .getAbsolutePath());
				JRBeanCollectionDataSource dataSource11 = new JRBeanCollectionDataSource(lesPers);
				JasperPrint jasperPrint11 = JasperFillManager.fillReport(jasperReport11, null, dataSource11);
				JRXlsxExporter exporter11= new JRXlsxExporter();
				exporter11.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter11.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter11.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint11);
				Object outputFileName11 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";
				exporter11.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName11);
				exporter11.exportReport();
				break;
				
			
				
			case "frubN":
				List<RubNum> lesFrubNum = rubNumRepo.findAll();
				
				// load file and compile it
				File filerubN = ResourceUtils.getFile("classpath:rubNum.jrxml");
				JasperReport jasperReport13 = JasperCompileManager.compileReport(filerubN.getAbsolutePath());
				JRBeanCollectionDataSource dataSource13 = new JRBeanCollectionDataSource(lesFrubNum);
				JasperPrint jasperPrint13 = JasperFillManager.fillReport(jasperReport13, null, dataSource13);
				JRXlsxExporter exporter13= new JRXlsxExporter();
				exporter13.setParameter(JRTextExporterParameter.PAGE_WIDTH, 80);
				exporter13.setParameter(JRTextExporterParameter.PAGE_HEIGHT, 40);
				exporter13.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint13);
				Object outputFileName13 = pathWithMounth + "\\" + fileName + " " + dateFormat + ".xlsx";				
				exporter13.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, outputFileName13);			
				exporter13.exportReport();			
				break;
			default:
				System.out.println("no match");

			
			
		}
	}

}
