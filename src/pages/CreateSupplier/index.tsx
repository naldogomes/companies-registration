import { FC, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useLocalStorage } from "usehooks-ts";
import { useForm } from "react-hook-form";
import {
  ButtonSubmit,
  Container,
  Form,
  FormContainer,
  InputDiv,
  InputsContainer,
  InputsRow,
  RadioDiv,
  Title,
} from "./styles";
import { validateCEP, validateCNPJ, validateCPF } from "../../utils/validators";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import HeaderMenu from "../../components/HeaderMenu";

export type Address = {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
};

export type Supplier = {
  id?: number;
  isCNPJ?: boolean;
  cnpj?: string;
  cpf?: string;
  fantasyName?: string;
  name?: string;
  cep: string;
  address?: Address;
  email: string;
  rg?: string;
  birthDate?: string;
};

export type SupplierForm = {
  cnpj: string;
  cpf: string;
  fantasyName: string;
  name: string;
  cep: string;
  email: string;
  rg: string;
  birthDate: string;
};

const defaultValues = {
  cnpj: "",
  cpf: "",
  fantasyName: "",
  name: "",
  cep: "",
  email: "",
  rg: "",
  birthDate: "",
};

const CreateSupplier: FC = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SupplierForm>({
    defaultValues: defaultValues,
  });

  const navigate = useNavigate();
  const { state } = useLocation();

  const { supplierToEdit, index } = state || {};

  const isEdit = !!supplierToEdit?.id;

  const [isCNPJ, setIsCNPJ] = useState(isEdit ? supplierToEdit.isCNPJ : true);
  const [address, setAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [suppliers, setSuppliers] = useLocalStorage<Supplier[]>(
    "suppliers",
    []
  );

  // useEffect(() => {
  //   console.log("suppliers", suppliers);
  // }, [suppliers]);

  const verifyCEP = async (cep: string) => {
    const response = await validateCEP(cep);
    if (response !== "CEP inválido") setAddress(response);

    return response;
  };

  useEffect(() => {
    if (isEdit) {
      console.log(supplierToEdit);
      if (supplierToEdit.isCNPJ) {
        setValue("cnpj", supplierToEdit.cnpj);
        setValue("fantasyName", supplierToEdit.fantasyName);
      } else {
        setValue("cpf", supplierToEdit.cpf);
        setValue("name", supplierToEdit.name);
        setValue("rg", supplierToEdit.rg);
        setValue("birthDate", supplierToEdit.birthDate);
      }
      setValue("email", supplierToEdit.email);
      setValue("cep", supplierToEdit.cep);
      verifyCEP(supplierToEdit.cep);
    }
  }, []);

  const handleSupplierType = (obj: Supplier, address: Address) => {
    const id = isEdit ? suppliers[index]?.id : suppliers.length + 1;
    const supplier = { ...obj, id, address, isCNPJ };
    if (isCNPJ) {
      delete supplier.cpf;
      delete supplier.name;
      delete supplier.rg;
      delete supplier.birthDate;
    } else {
      delete supplier.cnpj;
      delete supplier.fantasyName;
    }

    return supplier;
  };

  const onSubmit = async () => {
    let supplierAddress = address;
    if (!supplierAddress) supplierAddress = await verifyCEP(getValues().cep);
    const newSupplier = handleSupplierType(
      getValues(),
      supplierAddress || ({} as Address)
    );
    setIsLoading(true);
    setTimeout(() => {
      if (isEdit) {
        let newSuppliers = suppliers;
        newSuppliers[index] = newSupplier;
        setSuppliers(newSuppliers);
      } else {
        setSuppliers((prevValue) => [...prevValue, newSupplier]);
      }
      setIsLoading(false);
      navigate("/suppliers-list");
    }, 2000);
  };

  return (
    <>
      <HeaderMenu currentPage="supplier-form" />
      <Container>
        <FormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputsContainer>
              <Title>{`${isEdit ? "Editar" : "Cadastrar"} Fornecedor`}</Title>
              {!isEdit && (
                <RadioDiv>
                  <RadioDiv>
                    <span>Pessoa Jurídica</span>
                    <input
                      type="radio"
                      value="pj"
                      checked={isCNPJ}
                      onClick={() => {
                        setIsCNPJ(true);
                      }}
                      onChange={() => {}}
                    />
                  </RadioDiv>
                  <RadioDiv>
                    <span>Pessoa Física</span>
                    <input
                      type="radio"
                      value="pf"
                      checked={!isCNPJ}
                      onClick={() => {
                        setIsCNPJ(false);
                      }}
                      onChange={() => {}}
                    />
                  </RadioDiv>
                </RadioDiv>
              )}

              {isCNPJ ? (
                <>
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
                  <InputDiv isEmpty={false}>
                    <label>
                      Email
                      <input
                        {...register("email", {
                          required: "Campo obrigatório",
                        })}
                        type="email"
                        placeholder="nome@email.com"
                      />
                      {errors?.email && (
                        <small className="error-message">
                          {errors?.email?.message}
                        </small>
                      )}
                    </label>
                  </InputDiv>
                </>
              ) : (
                <>
                  <InputDiv isEmpty={errors?.cnpj?.type === "required"}>
                    <label>
                      CPF
                      <InputMask
                        mask="999.999.999-99"
                        type="text"
                        placeholder="000.000.000-00"
                        {...register("cpf", {
                          required: "Campo obrigatório",
                          validate: validateCPF,
                        })}
                      />
                      {errors?.cpf && (
                        <small className="error-message">
                          {errors?.cpf?.message}
                        </small>
                      )}
                    </label>
                  </InputDiv>
                  <InputDiv isEmpty={false}>
                    <label>
                      Nome
                      <input
                        {...register("name", {
                          required: "Campo obrigatório",
                        })}
                        placeholder="Nome"
                      />
                      {errors?.name && (
                        <small className="error-message">
                          {errors?.name?.message}
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
                  <InputDiv isEmpty={false}>
                    <label>
                      Email
                      <input
                        {...register("email", {
                          required: "Campo obrigatório",
                        })}
                        type="email"
                        placeholder="nome@email.com"
                      />
                      {errors?.email && (
                        <small className="error-message">
                          {errors?.email?.message}
                        </small>
                      )}
                    </label>
                  </InputDiv>
                  <InputDiv isEmpty={false}>
                    <label>
                      RG
                      <input
                        {...register("rg", {
                          required: "Campo obrigatório",
                        })}
                        maxLength={13}
                        type="text"
                        placeholder="Ex: 00.000.000-0"
                      />
                      {errors?.rg && (
                        <small className="error-message">
                          {errors?.rg?.message}
                        </small>
                      )}
                    </label>
                  </InputDiv>
                  <InputDiv isEmpty={false}>
                    <label>
                      Data de nascimento
                      <InputMask
                        mask="99/99/9999"
                        type="text"
                        placeholder="00/00/0000"
                        {...register("birthDate", {
                          required: "Campo obrigatório",
                        })}
                      />
                      {errors?.birthDate && (
                        <small className="error-message">
                          {errors?.birthDate?.message}
                        </small>
                      )}
                    </label>
                  </InputDiv>
                </>
              )}
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

export default CreateSupplier;
