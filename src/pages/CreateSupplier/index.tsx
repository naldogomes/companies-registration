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

  const [isCNPJ, setIsCNPJ] = useState(true);
  const [address, setAddress] = useState<Address | null>(null);

  const [suppliers, setSuppliers] = useLocalStorage<Supplier[]>(
    "suppliers",
    []
  );

  // useEffect(() => {
  //   setSuppliers([]);
  // }, []);

  useEffect(() => {
    console.log("suppliers", suppliers);
  }, [suppliers]);

  const handleSupplierType = (obj: Supplier, address: Address) => {
    const id = suppliers.length + 1;
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

  const verifyCEP = async (cep: string) => {
    const response = await validateCEP(cep);
    if (response !== "CEP inválido") setAddress(response);

    return response;
  };

  const onSubmit = async () => {
    let supplierAddress = address;
    if (!supplierAddress) supplierAddress = await verifyCEP(getValues().cep);
    const newSupplier = handleSupplierType(
      getValues(),
      supplierAddress || ({} as Address)
    );
    setSuppliers((prevValue) => [...prevValue, newSupplier]);
  };

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputsContainer>
            <Title>Cadastrar fornecedor</Title>
            <RadioDiv>
              <RadioDiv>
                <span>Pessoa jurídica</span>
                <input
                  type="radio"
                  value="pj"
                  checked={isCNPJ}
                  onClick={() => {
                    setIsCNPJ(true);
                  }}
                />
              </RadioDiv>
              <RadioDiv>
                <span>Pessoa física</span>
                <input
                  type="radio"
                  value="pf"
                  checked={!isCNPJ}
                  onClick={() => {
                    setIsCNPJ(false);
                  }}
                />
              </RadioDiv>
            </RadioDiv>

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
                      placeholder="00.000.000-0"
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
          <ButtonSubmit type="submit">Continuar</ButtonSubmit>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default CreateSupplier;
