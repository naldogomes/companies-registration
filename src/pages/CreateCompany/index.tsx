import { FC, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Select from "react-select";
import { useLocalStorage } from "usehooks-ts";
import { useForm, Controller } from "react-hook-form";
import {
  ButtonSubmit,
  Container,
  Form,
  FormContainer,
  InputDiv,
  InputsContainer,
  InputsRow,
  SelectContainer,
  Title,
  customStyles,
} from "./styles";
import { checkAge, validateCEP, validateCNPJ } from "../../utils/validators";
import { Address, Supplier } from "../CreateSupplier";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import HeaderMenu from "../../components/HeaderMenu";
import { toast } from "react-toastify";
import { SelectOptions } from "./SelectOptions";

export type Company = {
  id: number;
  cnpj: string;
  fantasyName: string;
  cep: string;
  address?: Address;
  suppliers: Array<Supplier>;
};

export type Options = {
  id: number;
  value: number;
  label: string;
};

const defaultValues = {
  cnpj: "",
  fantasyName: "",
  cep: "",
  suppliers: [{ cnpj: "", fantasyName: "", cep: "" }],
};

const CreateCompany: FC = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Company>({
    defaultValues: defaultValues,
  });

  const navigate = useNavigate();
  const { state } = useLocation();

  const { companyToEdit, index } = state || {};

  const isEdit = !!companyToEdit?.id;

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [address, setAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Options[]>([]);

  const [companies, setCompanies] = useLocalStorage<Company[]>("companies", []);

  useEffect(() => {
    const sup = JSON.parse(localStorage.getItem("suppliers") || "[]");
    const opt = sup?.map((supplier: Supplier) => ({
      id: supplier.id,
      value: supplier.id,
      label: supplier.cnpj ? supplier.fantasyName : supplier.name,
    }));

    setSuppliers(sup);
    setOptions(opt);
  }, []);

  const verifyCEP = async (cep: string) => {
    const response = await validateCEP(cep);
    if (response !== "CEP inválido") setAddress(response);

    return response;
  };

  useEffect(() => {
    if (isEdit) {
      console.log(companyToEdit);
      setValue("cnpj", companyToEdit.cnpj);
      setValue("fantasyName", companyToEdit.fantasyName);
      setValue("cep", companyToEdit.cep);
      verifyCEP(companyToEdit.cep);
    }
  }, []);

  const getSelectedSuppliers = () => {
    const defaultSuppliers: Options[] = [];
    if (isEdit && companyToEdit?.suppliers?.length) {
      companyToEdit?.suppliers.forEach((item: Supplier) => {
        const defaultSupplier = options.find((opt) => item.id === opt.id);
        if (defaultSupplier) {
          defaultSuppliers.push(defaultSupplier);
        }
      });
    }
    console.log("defaultSuppliers", defaultSuppliers);
    return defaultSuppliers;
  };

  // useEffect(() => {
  //   setCompanies([]);
  // }, []);

  // useEffect(() => {
  //   console.log("companies", companies);
  // }, [companies]);

  const handleCompanyCreation = (obj: Company, address: Address) => {
    const id = isEdit ? companyToEdit?.id : companies.length + 1;
    let selectedSuppliers: Supplier[] = [];
    let notAllowedSuppliers: Supplier[] = [];
    obj.suppliers.forEach((item) => {
      const supplier = suppliers.find((elm) => elm.id === item.id);
      if (supplier) {
        selectedSuppliers.push(supplier);
        if (address.uf === "PR" && supplier?.birthDate) {
          if (!checkAge(supplier?.birthDate))
            notAllowedSuppliers.push(supplier);
        }
      }
    });
    const company = { ...obj, id, address, suppliers: selectedSuppliers };
    return { company, notAllowedSuppliers };
  };

  const onSubmit = async () => {
    let companyAddress = address;
    if (!companyAddress) companyAddress = await verifyCEP(getValues().cep);
    const { company: newCompany, notAllowedSuppliers } = handleCompanyCreation(
      getValues(),
      companyAddress || ({} as Address)
    );
    setIsLoading(true);
    setTimeout(() => {
      if (!notAllowedSuppliers.length) {
        if (isEdit) {
          let newCompanies = companies;
          newCompanies[index] = newCompany;
          setCompanies(newCompanies);
          toast.success("Empresa editada com sucesso!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          setCompanies((prevValue) => [...prevValue, newCompany]);
          toast.success("Empresa cadastrada com sucesso!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setIsLoading(false);
        navigate("/companies-list");
      } else {
        setIsLoading(false);
        toast.error(
          "Empresas do Paraná não podem cadastrar fornecedor pessoa física menor de idade!",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        console.log("erro", notAllowedSuppliers);
      }
    }, 2000);
  };

  return (
    <>
      <HeaderMenu currentPage="company-form" />
      <Container>
        <FormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputsContainer>
              <Title>{`${isEdit ? "Editar" : "Cadastrar"} Empresa`}</Title>
              <InputDiv isEmpty={errors?.cnpj?.type === "required"}>
                <label>
                  CNPJ
                  <InputMask
                    mask="99.999.999/9999-99"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    {...register("cnpj", {
                      required: "Campo obrigatório",
                      validate: validateCNPJ,
                    })}
                  />
                  {errors?.cnpj && (
                    <small className="error-message">
                      {errors?.cnpj?.message}
                    </small>
                  )}
                </label>
              </InputDiv>
              <InputDiv isEmpty={false}>
                <label>
                  Nome fantasia
                  <input
                    {...register("fantasyName", {
                      required: "Campo obrigatório",
                    })}
                    placeholder="Nome fantasia"
                  />
                  {errors?.fantasyName && (
                    <small className="error-message">
                      {errors?.fantasyName?.message}
                    </small>
                  )}
                </label>
              </InputDiv>
              <InputsRow>
                <InputDiv isEmpty={false} width={"120px"}>
                  <label>
                    CEP
                    <InputMask
                      mask="99999-999"
                      type="text"
                      placeholder="00000-00"
                      {...register("cep", {
                        required: "Campo obrigatório",
                        validate: verifyCEP,
                      })}
                      onBlur={(e) => {
                        verifyCEP(e.target.value);
                      }}
                    />
                    {errors?.cep && (
                      <small className="error-message">
                        {errors?.cep?.message}
                      </small>
                    )}
                  </label>
                </InputDiv>
                <InputDiv isEmpty={false} width={"60px"} isDisabled>
                  <label>
                    UF
                    <input
                      value={address?.uf}
                      type="text"
                      placeholder="UF"
                      disabled
                    />
                  </label>
                </InputDiv>
                <InputDiv isEmpty={false} isDisabled>
                  <label>
                    Cidade
                    <input
                      value={address?.localidade}
                      type="text"
                      placeholder="Cidade"
                      disabled
                    />
                  </label>
                </InputDiv>
              </InputsRow>
              <InputDiv>
                <SelectContainer>
                  <label>Fornecedores (opcional)</label>

                  <Controller
                    name="suppliers"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={options}
                        key={JSON.stringify(options)}
                        onChange={(val: any) => {
                          onChange(val);
                        }}
                        defaultValue={getSelectedSuppliers()}
                        value={options.find((c: any) => c.value === value)}
                        components={{
                          Option: SelectOptions,
                        }}
                        isMulti
                        isSearchable
                        placeholder="Selecione os atributos"
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        styles={customStyles}
                        isClearable={false}
                        noOptionsMessage={() => "Nenhum fornecedor encontrado"}
                      />
                    )}
                  />
                </SelectContainer>
              </InputDiv>
            </InputsContainer>
            <ButtonSubmit type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Salvar"}
            </ButtonSubmit>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default CreateCompany;
