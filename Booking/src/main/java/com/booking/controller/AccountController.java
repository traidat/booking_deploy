package com.booking.controller;

import com.booking.model.account.*;
import com.booking.model.agent.Agent;
import com.booking.model.agent.AgentSignUp;
import com.booking.model.Message;
import com.booking.model.tourist.SignUp;
import com.booking.model.Token;
import com.booking.model.tourist.Tourist;
import com.booking.repository.TouristRepository;
import com.booking.service.AccountService;
import com.booking.service.ErrorService;
import com.booking.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class AccountController {
    @Autowired
    AccountService accountService;
    @Autowired
    JWTService jwtService;


    @PostMapping("api/account/{type}")
    public ResponseEntity createAccount(@RequestBody @Valid AccountLogin accountLogin, BindingResult bindingResult,
                                        @PathVariable String type) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            if (!accountService.isUsernameExist(accountLogin.getUsername())) {
                if (type.equals("0")) {
                    if (accountService.createAccount(accountLogin, AccountType.AGENT)) {
                        return new ResponseEntity(accountService.getAccount(accountLogin.getUsername()), HttpStatus.OK);
                    } else {
                        List<Message> message = new ArrayList<Message>() {{
                            add(new Message("Create account failed"));
                        }};
                        return new ResponseEntity(message, HttpStatus.CONFLICT);
                    }
                } else {
                    if (accountService.createAccount(accountLogin, AccountType.TOURIST)) {
                        return new ResponseEntity(accountService.getAccount(accountLogin.getUsername()), HttpStatus.OK);
                    } else {
                        List<Message> message = new ArrayList<Message>() {{
                            add(new Message("Create account failed"));
                        }};
                        return new ResponseEntity(message, HttpStatus.CONFLICT);
                    }
                }
            } else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("User has exist"));
                }};
                return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
            }
        }
    }

    @PostMapping("api/fb")
    public ResponseEntity loginFb(@RequestBody @Valid AccountFB accountFB, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            String[] username = accountFB.getEmail().split("@");
            if (!accountService.isAccountExist(username[0], " ")) {
                AccountLogin accountLogin = new AccountLogin(username[0], " ");
                if (accountService.createAccount(accountLogin, AccountType.TOURIST)) {
                    Optional<Account> optionalAccount = accountService.getAccount(accountLogin.getUsername());
                    Account account;
                    if (optionalAccount.isPresent()) {
                        account = optionalAccount.get();
                        return new ResponseEntity(account, HttpStatus.CREATED);
                    } else {
                        List<Message> message = new ArrayList<Message>() {{
                            add(new Message("Login failed"));
                        }};
                        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                    }
                } else {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Login failed error server"));
                    }};
                    return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                }
            } else {
                Account account = accountService.getAccount(username[0]).get();
                String jwt = jwtService.generateTokenLogin(username[0]);
                Token token = new Token(jwt, account.getAccountType());
                return new ResponseEntity(token, HttpStatus.OK);
            }
        }
    }

    @PostMapping("api/signup/{id}")
    public ResponseEntity signup(@RequestBody @Valid SignUp signUp, BindingResult bindingResult, @PathVariable String id) {
        int accountId;
        try {
            accountId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Account invalid"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            if (!accountService.isEmailExist(signUp.getEmail())) {
                if (accountService.getAccount(accountId).isPresent()) {
                    if (accountService.createTourist(signUp, accountId)) {
                        Optional<Account> optionalAccount = accountService.getAccount(accountId);
                        if (optionalAccount.isPresent()) {
                            Account account = optionalAccount.get();
                            String jwt = jwtService.generateTokenLogin(account.getUsername());
                            Token token = new Token(jwt, account.getAccountType());
                            return new ResponseEntity<Object>(token, HttpStatus.OK);
                        } else {
                            List<Message> message = new ArrayList<Message>() {{
                                add(new Message("Create tourist failed"));
                            }};
                            return new ResponseEntity(message, HttpStatus.CONFLICT);
                        }
                    } else {
                        List<Message> message = new ArrayList<Message>() {{
                            add(new Message("Create tourist failed"));
                        }};
                        return new ResponseEntity(message, HttpStatus.CONFLICT);
                    }
                } else {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("User has exist"));
                    }};
                    return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                }
            }  else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Email has exist"));
                }};
                return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
            }
        }
    }

    @PostMapping("api/agent/signup/{id}")
    public ResponseEntity agentSignup(@RequestBody @Valid AgentSignUp agentSignUp, BindingResult bindingResult,
                                      @PathVariable String id) {
        int accountId;
        try {
            accountId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Account invalid"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            if (accountService.getAccount(accountId).isPresent()) {
                if (agentSignUp.isValidAgentType()) {
                    if (accountService.createAgent(agentSignUp, accountId)) {
                        List<Message> message = new ArrayList<Message>() {{
                            add(new Message("Sign up success"));
                        }};
                        return new ResponseEntity(message, HttpStatus.OK);
                    } else {
                        List<Message> message = new ArrayList<Message>() {{
                            add(new Message("Create agent failed"));
                        }};
                        return new ResponseEntity(message, HttpStatus.CONFLICT);
                    }
                } else {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Agent type invalid"));
                    }};
                    return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                }
            } else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Username has exist"));
                }};
                return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
            }
        }
    }

    @PostMapping(value = "api/login")
    public ResponseEntity login(@RequestBody @Valid AccountLogin accountLogin, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            if (accountService.isAccountExist(accountLogin.getUsername(), accountLogin.getPassword())) {
                Account account = accountService.getAccount(accountLogin.getUsername()).get();
                if (account.getAccountType() != AccountType.TOURIST_BANNED) {
                    String jwt = jwtService.generateTokenLogin(accountLogin.getUsername());
                    Token token = new Token(jwt, account.getAccountType());
                    return new ResponseEntity<Object>(token, HttpStatus.OK);
                } else {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("User forbbiden"));
                    }};
                    return new ResponseEntity(message, HttpStatus.FORBIDDEN);
                }

            } else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Username or password wrong"));
                }};
                return new ResponseEntity(message, HttpStatus.CONFLICT);
            }
        }
    }

    @PostMapping("api/personal")
    public ResponseEntity getPersonal(HttpServletRequest request) {
        String token = jwtService.getJwtFromRequest(request);
        String username = jwtService.getUserNameFromJwtToken(token);
        Optional<Account> account = accountService.getAccount(username);
        Optional<Tourist> tourist = accountService.getTourist(account.get().getId());
        if (tourist.isPresent()) {
            List<Tourist> touristList = new ArrayList<Tourist>() {{
                add(tourist.get());
            }};
            return new ResponseEntity(touristList, HttpStatus.OK);
        } else {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("User unauthorized"));
            }};
            return new ResponseEntity(message, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("api/personal_agent")
    public ResponseEntity getPersonalAgent(HttpServletRequest request) {
        String token = jwtService.getJwtFromRequest(request);
        String username = jwtService.getUserNameFromJwtToken(token);
        Optional<Account> account = accountService.getAccount(username);
        List<Agent> agent = accountService.getAgent(account.get().getId());
        return new ResponseEntity(agent, HttpStatus.OK);
    }

    @GetMapping("api/admin/personal_agent/{id}")
    public ResponseEntity adminGetPersonalAgent(@PathVariable String id) {
        int accountId;
        try {
            accountId = Integer.parseInt(id);
        } catch (Exception e) {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Account invalid"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        List<Agent> agent = accountService.getAgent(accountId);
        return new ResponseEntity(agent, HttpStatus.OK);
    }

    @GetMapping("api/account")
    public ResponseEntity getAccount(HttpServletRequest request) {
        String token = jwtService.getJwtFromRequest(request);
        String username = jwtService.getUserNameFromJwtToken(token);
        Optional<Account> account = accountService.getAccount(username);
        if (account.isPresent()) {
            List<Account> accountList = new ArrayList<Account>() {{
                add(account.get());
            }};
            return new ResponseEntity(accountList, HttpStatus.OK);
        } else {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("User unauthorizeds"));
            }};
            return new ResponseEntity(message, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("api/account/password")
    public ResponseEntity changePassword(@RequestBody AccountPassword accountPassword, BindingResult bindingResult,
                                         HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            String token = jwtService.getJwtFromRequest(request);
            String username = jwtService.getUserNameFromJwtToken(token);
            Optional<Account> account = accountService.getAccount(username);
            if (account.isPresent()) {
                try {
                    accountService.changePassword(account.get().getId(), accountPassword.getOldPass(), accountPassword.getNewPass());
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Change password succes"));
                    }};
                    return new ResponseEntity(message, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    List<Message> messageErr = new ArrayList<Message>() {{
                        add(new Message(e.getMessage()));
                    }};
                    return new ResponseEntity(messageErr, HttpStatus.CONFLICT);
                }
            } else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Account not found"));
                }};
                return new ResponseEntity(message, HttpStatus.NOT_FOUND);
            }
        }
    }

    @GetMapping("api/account/type")
    public ResponseEntity getAllAccountByType (@RequestParam String type) {
        if (type.equals(AccountType.AGENT.toString())  || type.equals(AccountType.AGENT_BANNED.toString()) ) {
            List<Account> list = new ArrayList<Account>() {{
                addAll(accountService.getAllAccountByAccountType(AccountType.AGENT));
                addAll(accountService.getAllAccountByAccountType(AccountType.AGENT_BANNED));
            }};
            return new ResponseEntity(list, HttpStatus.OK);
        } else if (type.equals(AccountType.TOURIST_BANNED.toString())  || type.equals(AccountType.TOURIST.toString())) {
            List<Account> list = new ArrayList<Account>() {{
                addAll(accountService.getAllAccountByAccountType(AccountType.TOURIST));
                addAll(accountService.getAllAccountByAccountType(AccountType.TOURIST_BANNED));
            }};
            return new ResponseEntity(list, HttpStatus.OK);
        } else {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found Account Type"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("api/admin/tourist")
    public ResponseEntity adminGetTourist (@RequestParam String id) {
        int accountId;
        try {
            accountId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found Tourist"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        List<Tourist> list = new ArrayList<Tourist>() {{
            add(accountService.getTourist(accountId).get());
        }};
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("api/admin/banned/{id}")
    public ResponseEntity bannedAccount(@PathVariable String id) {
        int accountId;
        try {
            accountId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found Account"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        if (accountService.bannedAccount(accountId)) {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Banned success"));
            }};
            return new ResponseEntity(message, HttpStatus.OK);
        } else {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Banned failed"));
            }};
            return new ResponseEntity(message, HttpStatus.CONFLICT);
        }
    }
}
