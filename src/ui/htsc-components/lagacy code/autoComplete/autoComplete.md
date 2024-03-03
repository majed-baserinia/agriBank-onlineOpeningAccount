# usage

```
<form onSubmit={handleSubmit(onSubmit)}>
      <Controller
                name="destinationAccount"
                control={control}
                render={({ field }) => {
                  return (
                    <AutoComplete
                      isRequired
                      onChangeValue={field.onChange}
                      selectOptions={accountopt}
                      label={t("accountNumber")}
                      loading={false}
                      valueToSendToServiceOnChange={(event, newValue) => {
                        return newValue.value.toString();
                      }}
                      valueToShowToInput={(option) => {
                        return {
                          text: option.value.toString(),
                          icon: (
                            <Grid sx={{ height: "24px", width: "24px" }}>
                              <img
                                style={{ width: "100%", height: "100%" }}
                                src={option.iconImg}
                                alt={option.nameIcon}
                              />
                            </Grid>
                          )
                        };
                      }}
                      renderOption={(props, option) => {
                        if (typeof option === "string") {
                          return (
                            <li
                              key={option}
                              {...props}
                            >
                              {option}
                            </li>
                          );
                        }
                        return (
                          <>
                            <li
                              {...props}
                              key={option.value}
                              style={{ margin: "10px 0" }}
                            >
                              <Grid
                                container
                                justifyContent={"center"}
                                alignItems="Center"
                                gap={"5px"}
                                wrap="nowrap"
                              >
                                <Grid sx={{ height: "24px", width: "24px" }}>
                                  <img
                                    style={{ width: "100%", height: "100%" }}
                                    src={option.iconImg}
                                    alt={option.nameIcon}
                                  />
                                </Grid>
                                <Grid
                                  container
                                  direction={"column"}
                                  alignItems="flex-start"
                                  gap={"5px"}
                                >
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      color: theme.palette.grey[200]
                                    }}
                                  >
                                    {option.label + " (" + option.nameIcon + ")"}
                                  </span>
                                  <span style={{ fontSize: "14px" }}>{option.value}</span>
                                </Grid>
                              </Grid>
                            </li>
                            <Divider />
                          </>
                        );
                      }}
                      isOptionEqualToValue={(option, value) => {
                        return option.label === value.label;
                      }}
                      error={
                        errorTextGenerator(
                          AccountChargeInquiryerror.destinationAccount?.message,
                          AccountChargeInquiryApiErrors?.errors?.destinationAccount
                        )
                          ? true
                          : false
                      }
                      helperText={errorTextGenerator(
                        AccountChargeInquiryerror.destinationAccount?.message,
                        AccountChargeInquiryApiErrors?.errors?.destinationAccount
                      )}
                    />
                  );
                }}
              />

      <Button type="submit" variant="contained">
        تایید
      </Button>
    </form>
```


## renderOption

yo have to provide to ui of the options for both string and your custom type 
it should be li tag 


## isOptionEqualToValue

declare what property to check if item is selected 


## valueToShowToInput

return a string for shoeing to user 


## valueToSendToServiceOnChange 

return a value that you want to save and send it to the service 
it executs on select

## onChangeValue

onchange function from the hook form 



## other props 

you access to other props like muiProps 
it is an object that will pass directly to autocomplete 
you can use it to access mui api