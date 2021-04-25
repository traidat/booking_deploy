package com.booking.service;

import com.booking.model.Image;
import com.booking.model.account.Account;
import com.booking.model.account.AccountLogin;
import com.booking.model.account.AccountType;
import com.booking.model.agent.Agent;
import com.booking.model.agent.AgentSignUp;
import com.booking.model.Services;
import com.booking.model.agent.AgentType;
import com.booking.model.tourist.SignUp;
import com.booking.model.tourist.Tourist;
import com.booking.repository.*;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    TouristRepository touristRepository;
    @Autowired
    AgentRepository agentRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    ImageRepository imageRepository;


    public boolean createAccount(AccountLogin accountLogin, AccountType accountType) {
        Account account = new Account( accountLogin.getUsername(), BCrypt.hashpw(accountLogin.getPassword(),
                BCrypt.gensalt(10)), accountType);
        try {
            accountRepository.save(account);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean changePassword(int accountId, String oldPass, String newPass) throws Exception {
        Optional<Account> optionalAccount = getAccount(accountId);
        Account account;
        if (optionalAccount.isPresent()) {
            account = optionalAccount.get();
            if (BCrypt.checkpw(oldPass, account.getPassword())) {
                account.setPassword(BCrypt.hashpw(newPass, BCrypt.gensalt(10)));
                try {
                    accountRepository.save(account);
                    return  true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            } else {
                throw new Exception("Password wrong");
            }
        } else {
            throw new Exception("Not found account");
        }
    }

    public boolean isAccountExist(String username, String password) {
        Optional<Account> account = accountRepository.findByUsername(username);
        if (account.isPresent()) {
            return BCrypt.checkpw(password, account.get().getPassword());
        } else {
            return false;
        }
    }

    public boolean isEmailExist(String email) {
        Optional<Tourist> optionalTourist = touristRepository.findByEmail(email);
        if (optionalTourist.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public boolean isUsernameExist(String username) {
        Optional<Account> account = accountRepository.findByUsername(username);
        return account.isPresent();
    }

    public Optional<Account> getAccount(String username) {
        Optional<Account> account = accountRepository.findByUsername(username);
        if (account.isPresent()) {
            return account;
        } else {
            return Optional.empty();
        }
    }

    public Optional<Account> getAccount(int id) {
        Optional<Account> account = accountRepository.findById(id);
        if (account.isPresent()) {
            return account;
        } else {
            return Optional.empty();
        }
    }

    public List<Agent> getAgent(int accountId) {
        Optional<List<Agent>> agent = agentRepository.findByAccountId(accountId);
        if (agent.isPresent()) {
            return agent.get();
        } else {
            return new ArrayList<>();
        }
    }

    public Optional<Tourist> getTourist(int accountId) {
        Optional<Tourist> tourist = touristRepository.findByAccountId(accountId);
        if (tourist.isPresent()) {
            return tourist;
        } else {
            return Optional.empty();
        }
    }

    public Tourist getTouristById(int touristId) {
        Optional<Tourist> tourist = touristRepository.findById(touristId);
        if (tourist.isPresent()) {
            return tourist.get();
        } else {
            return null;
        }
    }

    public boolean createTourist(SignUp signUp, int id) {
        Tourist tourist = new Tourist(id, signUp.getName(), signUp.getEmail(),
                signUp.getAge(), signUp.getPhone());
        if (signUp.getUrl() != null) {
            String url = signUp.getUrl().get(0);
            Image image = new Image();
            image.setUrl(url);
            imageRepository.save(image);
            tourist.setImage(image);
        } else {
            Image image = imageRepository.findById(1).get();
            tourist.setImage(image);
        }
        try {
            touristRepository.save(tourist);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean createAgent(AgentSignUp agentSignUp, int accountId) {
        Agent agent = new Agent(accountId, agentSignUp.getName(), agentSignUp.getEmail(), agentSignUp.getPhone(),
                agentSignUp.getCity(), agentSignUp.getCountry(), agentSignUp.getAddress(), agentSignUp.getDescription(),
                AgentType.valueOf(agentSignUp.getAgentType()));
        agent.setLat(agentSignUp.getLat());
        agent.setLng(agentSignUp.getLng());
        List<Integer> listService = agentSignUp.getServices();
        List<Services> services = new ArrayList<>();
        if (listService != null) {
            for (Integer integer : listService) {
                Optional<Services> s = serviceRepository.findById(integer);
                if (s.isPresent()) {
                    services.add(s.get());
                }
            }
            agent.setServices(services);
        }
        Set<Image> images = new HashSet<>();
        Set<String> url = agentSignUp.getImages();
        if (url != null) {
            for (String s : url) {
                Image image = new Image();
                image.setUrl(s);
                imageRepository.save(image);
                images.add(image);
            }
            agent.setImages(images);
        }
        try {
            agentRepository.save(agent);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<String> getCityByCountry(String country) {
        Optional<List<String>> listCountry = agentRepository.findCityByCountry(country);
        if (listCountry.isPresent()) {
            List<String> cities = listCountry.get();
            List<String> distinctCity = new ArrayList<>();
            for (String city : cities) {
                if (distinctCity.contains(city)) {
                    continue;
                } else {
                    distinctCity.add(city);
                }
            }
            return distinctCity;
        } else {
            return new ArrayList<>();
        }
    }

    public List<String> getAllCountry() {
        Optional<List<String>> allCountry = agentRepository.findAllCountry();
        if (allCountry.isPresent()) {
            return allCountry.get();
        } else {
            return new ArrayList<>();
        }
    }

    public List<Account> getAllAccountByAccountType(AccountType accountType) {
        Optional<List<Account>> optionalAccounts = accountRepository.findByAccountType(accountType);
        if (optionalAccounts.isPresent()) {
            return optionalAccounts.get();
        } else {
            return new ArrayList<>();
        }
    }

    public boolean bannedAccount(int id) {
        Optional<Account> optionalAccount = accountRepository.findById(id);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if(account.getAccountType() == AccountType.AGENT) {
                account.setAccountType(AccountType.AGENT_BANNED);
                try {
                    accountRepository.save(account);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            } else if (account.getAccountType() == AccountType.AGENT_BANNED){
                account.setAccountType(AccountType.AGENT);
                try {
                    accountRepository.save(account);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            } else if (account.getAccountType() == AccountType.TOURIST_BANNED){
                account.setAccountType(AccountType.TOURIST);
                try {
                    accountRepository.save(account);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            } else {
                account.setAccountType(AccountType.TOURIST_BANNED);
                try {
                    accountRepository.save(account);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }
        } else {
            return false;
        }
    }
}
